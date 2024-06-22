import {
  DynamoDBClient,
  PutItemCommand,
  QueryCommand,
} from '@aws-sdk/client-dynamodb';
import { InternalServerError } from '@shared/domain/errors';
import { EnvConfigFactory } from '@shared/infra/env';
import { IUsersRepository, User } from '@users/data';

export class UsersRepository implements IUsersRepository {
  public static instance: UsersRepository | null = null;
  public readonly tableName: string;

  private constructor(private readonly dbClient: DynamoDBClient) {
    const envConfig = EnvConfigFactory.create();
    this.tableName = envConfig.getUsersTableName();
  }

  public static createInstance(dbClient: DynamoDBClient): UsersRepository {
    if (!UsersRepository.instance) {
      UsersRepository.instance = new UsersRepository(dbClient);
    }

    return this.instance;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const params = {
      TableName: this.tableName,
      IndexName: 'email',
      KeyConditionExpression: '#email = :email',
      ExpressionAttributeNames: { '#email': 'email' },
      ExpressionAttributeValues: { ':email': { S: email } },
    };

    try {
      const command = new QueryCommand(params);
      const { Items } = await this.dbClient.send(command);

      if (!Items && Items.length <= 0) return undefined;

      const item = Items[0];

      return {
        id: item.id.S,
        name: item.name.S,
        email: item.email.S,
        fone: item.fone.S,
        password: item.password.S,
      };
    } catch (error) {
      throw new InternalServerError(
        error.message || 'Ocorreu um erro ao buscar usuário por email',
      );
    }
  }

  public async create(data: User): Promise<void> {
    const params = {
      TableName: this.tableName,
      Item: {
        id: { S: data.id },
        name: { S: data.name },
        email: { S: data.email },
        fone: { S: data.fone },
        password: { S: data.password },
      },
    };

    try {
      const command = new PutItemCommand(params);
      await this.dbClient.send(command);
    } catch (error) {
      throw new InternalServerError(
        error.message || 'Ocorreu um erro ao criar usuário',
      );
    }
  }

  public async findById(id: string): Promise<User> {
    const params = {
      TableName: this.tableName,
      IndexName: 'id',
      KeyConditionExpression: '#id = :id',
      ExpressionAttributeNames: { '#id': 'id' },
      ExpressionAttributeValues: { ':id': { S: id } },
    };

    try {
      const command = new QueryCommand(params);
      const { Items } = await this.dbClient.send(command);

      if (!Items && Items.length <= 0) return undefined;

      const item = Items[0];

      return {
        id: item.id.S,
        name: item.name.S,
        email: item.email.S,
        fone: item.fone.S,
        password: item.password.S,
      };
    } catch (error) {
      throw new InternalServerError(
        error.message || 'Ocorreu um erro ao buscar usuário por id',
      );
    }
  }
}
