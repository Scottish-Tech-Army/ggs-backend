import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export const dynamodbClient = new DynamoDBClient({
  region: process.env.REGION,
});
