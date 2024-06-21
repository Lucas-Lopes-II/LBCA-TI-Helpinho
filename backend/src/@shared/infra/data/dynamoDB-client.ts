import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

export const clientDB = new DynamoDBClient({
  region: 'us-east-1',
});
