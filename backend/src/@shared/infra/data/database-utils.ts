import {
  DynamoDBClient,
  ScanCommand,
  ScanCommandInput,
} from '@aws-sdk/client-dynamodb';

export class DatabaseUtils {
  public static readonly dbClient = new DynamoDBClient({
    region: 'us-east-1',
  });

  public static async getTableCount(tableName: string): Promise<number> {
    const params: ScanCommandInput = {
      TableName: tableName,
      Select: 'COUNT',
    };
    try {
      const response = await this.dbClient.send(new ScanCommand(params));
      return response.Count;
    } catch (error) {
      console.error('Erro ao contar itens:', error);
      throw error;
    }
  }
}
