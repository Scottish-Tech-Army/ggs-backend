#!/usr/bin/env node

const cdk = require("aws-cdk-lib");
const dynamodb = require("aws-cdk-lib/aws-dynamodb");
const { NodejsFunction } = require("aws-cdk-lib/aws-lambda-nodejs");
const lambda = require("aws-cdk-lib/aws-lambda");
const apigateway = require("aws-cdk-lib/aws-apigateway");
const { Bucket } = require("aws-cdk-lib/aws-s3");
const cloudfront = require("aws-cdk-lib/aws-cloudfront");
const origins = require("aws-cdk-lib/aws-cloudfront-origins");

const app = new cdk.App();
const envStageName = app.node.tryGetContext("env");

if (!envStageName) {
  throw new Error(
    `run with parameters:
      --context env=ENVIRONMENT_NAME (i.e. dev, test, live, etc.)`
  );
}

const stackId = "GGS-Backend-" + envStageName;
const resourcePrefix = "GGS-" + envStageName;

class CdkBackendStack extends cdk.Stack {
  constructor(scope) {
    super(scope, stackId);

    // Common resources
    const stack = cdk.Stack.of(this);
    const region = stack.region;

    const LOCATION_PHOTOS_BUCKET_NAME =
      resourcePrefix.toLowerCase() + "-location-photos";
    const DISTRIBUTION_NAME = stackId + "-Distribution";

    const LOCATIONS_TABLE_NAME = resourcePrefix + "-Locations";
    const UNITS_TABLE_NAME = resourcePrefix + "-Units";

    // S3 bucket for location photos

    const locationPhotosBucket = new Bucket(this, "Location Photos", {
      bucketName: LOCATION_PHOTOS_BUCKET_NAME,
    });

    new cdk.CfnOutput(this, "Location Photos bucket", {
      value: locationPhotosBucket.bucketName,
      description: "S3 bucket containing location photos",
    });

    // CloudFront distribution for location photos

    const locationPhotosDistribution = new cloudfront.Distribution(
      this,
      DISTRIBUTION_NAME,
      {
        defaultBehavior: {
          origin: new origins.S3Origin(locationPhotosBucket),
          allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
          viewerProtocolPolicy:
            cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        },
        defaultRootObject: "index.html",
      }
    );

    new cdk.CfnOutput(this, LOCATION_PHOTOS_BUCKET_NAME + " URL", {
      value: "https://" + locationPhotosDistribution.domainName,
      description:
        "External URL for " + LOCATION_PHOTOS_BUCKET_NAME + " website",
    });

    // Database tables for locations and units

    const locationsTable = new dynamodb.Table(this, "Locations", {
      tableName: LOCATIONS_TABLE_NAME,
      partitionKey: { name: "locationId", type: dynamodb.AttributeType.STRING },
    });
    new cdk.CfnOutput(this, "Locations table", {
      value: locationsTable.tableName,
      description: "DynamoDB table containing locations",
    });

    const unitsTable = new dynamodb.Table(this, "Units", {
      tableName: UNITS_TABLE_NAME,
      partitionKey: { name: "unitId", type: dynamodb.AttributeType.STRING },
    });
    new cdk.CfnOutput(this, "Units table", {
      value: unitsTable.tableName,
      description: "DynamoDB table containing units",
    });

    // Lambda to process user API requests

    const ggsLambda = new NodejsFunction(this, "GGSLambda", {
      runtime: lambda.Runtime.NODEJS_16_X,
      entry: "resources/ggsLambda/index.ts",
      handler: "handler",
      environment: {
        REGION: region,
        LOCATIONS_TABLE_NAME,
        UNITS_TABLE_NAME,
      },
      timeout: cdk.Duration.seconds(30),
      commandHooks: {
        beforeBundling(inputDir) {
          return [`cd ${inputDir} && npm install`];
        },
      },
    });

    locationsTable.grant(ggsLambda, "dynamodb:GetItem", "dynamodb:Scan");
    unitsTable.grant(
      ggsLambda,
      "dynamodb:GetItem",
      "dynamodb:PutItem",
      "dynamodb:Scan"
    );

    // API gateway

    const restApi = new apigateway.LambdaRestApi(this, "GGSClientApi", {
      handler: ggsLambda,
      proxy: false,
      restApiName: "GGS Client Service (" + envStageName + ")",
      description: "This service provides the GGS app functions.",
      defaultCorsPreflightOptions: {
        allowHeaders: ["Content-Type", "ggsunit"],
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
      },
      deployOptions: {
        stageName: envStageName,
      },
    });
    new cdk.CfnOutput(this, "GGS client API endpoint", {
      value: restApi.urlForPath(),
      description: "API Gateway endpoint for GGS API",
    });

    // API GET /locations
    const locationsApiResource = restApi.root.addResource("locations");
    locationsApiResource.addMethod("GET");

    const unitApiResource = restApi.root.addResource("unit");

    // API POST /unit/login
    const unitLoginApiResource = unitApiResource.addResource("login");
    unitLoginApiResource.addMethod("POST");

    // API POST /unit/register
    const unitRegisterApiResource = unitApiResource.addResource("register");
    unitRegisterApiResource.addMethod("POST");

    // API POST /unit/collect
    const unitCollectApiResource = unitApiResource.addResource("collect");
    unitCollectApiResource.addMethod("POST");

    // API GET /unit/leaderboard
    const unitLeaderboardApiResource =
      unitApiResource.addResource("leaderboard");
    unitLeaderboardApiResource.addMethod("GET");
  }
}

const backendStack = new CdkBackendStack(app);
cdk.Tags.of(backendStack).add("DeployEnvironment", envStageName);
