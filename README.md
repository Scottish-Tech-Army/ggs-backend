# CDK Deployment stack for GGS application

This project handles the CDK creation of backend resources of the GGS applications.

## Building and deploying

To build the components of the application and deploy to AWS, follow these instructions after cloning the repo. The instructions are environment specific. In the instructions below, the environment being created is `dev`. Other options are `test` and `live`.

### Prerequisites

The following tools are needed in the build and deploy process, install them first

- Register or use an existing AWS account with [CLI access keys](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html).
- Install [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/)
- Install the [AWS CDK](https://docs.aws.amazon.com/cdk/index.html), described here: https://docs.aws.amazon.com/cdk/latest/guide/getting_started.html#getting_started_install

### Build and deploy the backend components

In the following, `PROJECT_ROOT` is the directory where you have cloned the repo.

#### Install dependencies for node projects

```
cd PROJECT_ROOT; npm install
cd resources/ggsLambda; npm install
```

#### Deploy backend

If it's the first time CDK use in an environment, the environment needs to be [prepared](https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping.html) for the deployment. Run the following first

```
cdk bootstrap aws://AWS_ACCOUNT_NUMBER/REGION [--profile AWS_PROFILE] --context env=dev
```
Here `aws://AWS_ACCOUNT_NUMBER/REGION` is the AWS account and region to use for the deployment, e.g. `aws://1234567890/eu-west-2`.
Use `--profile AWS_PROFILE` if necessary to choose the correct [AWS CLI access keys](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html).

```
npm i @aws-sdk/client-dynamodb @aws-sdk/util-dynamodb es6-promise isomorphic-fetch
```
This installs the outstanding dependencies not install by `npm install`.

Once that's done, the rest of the deploy should go smoothly

```
cd PROJECT_ROOT
cdk deploy [--profile AWS_PROFILE] --context env=dev
```

The CDK will create and deploy a CloudFormation stack of the backend AWS components. If it completes successfully, it will return output like:

```
 ✅  GGS-Backend-dev

Outputs:
GGS-Backend-dev.GGSClientApiEndpointFA6F00A7 = https://XXXXXXXXXX.execute-api.eu-west-2.amazonaws.com/dev/
GGS-Backend-dev.GGSclientAPIendpoint = https://XXXXXXXXXX.execute-api.eu-west-2.amazonaws.com/dev/
GGS-Backend-dev.Locationstable = GGS-dev-Locations
GGS-Backend-dev.Unitstable = GGS-dev-Units
Stack ARN:
arn:aws:cloudformation:eu-west-2:1111111111:stack/GGS-Backend-dev/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee
```

These outputs are also shown in the outputs section of the CloudformationStack in the AWS Console. They are used to populate the environment specific parameters in the build of the frontend client.

## AWS Deployment architecture

The GGS backend consists of:

- A DominoDB table of location definitions, and a table of units and their collected locations
- Lambda function processing the client API requests.
- API Gateway wrapper for this lambda function.

The DynamoDB tables are set to retain on delete, with fixed resource names to avoid a CloudFormation update replacing them (as their contents are not easily replaced).
