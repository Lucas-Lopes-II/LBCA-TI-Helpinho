import {
  DeleteItemCommand,
  DynamoDBClient,
  PutItemCommand,
  QueryCommand,
  ReturnValue,
  UpdateItemCommand,
} from '@aws-sdk/client-dynamodb';
import { EnvConfigFactory } from '@shared/infra/env';
import { InternalServerError } from '@shared/domain/errors';
import { Help, HelpCategory, IHelpsRepository } from '@helps/data';

export class HelpsRepository implements IHelpsRepository {
  public static instance: HelpsRepository | null = null;
  public readonly tableName: string;

  private constructor(private readonly dbClient: DynamoDBClient) {
    const envConfig = EnvConfigFactory.create();
    this.tableName = envConfig.getHelpsTableName();
  }

  public static createInstance(dbClient: DynamoDBClient): HelpsRepository {
    if (!HelpsRepository.instance) {
      HelpsRepository.instance = new HelpsRepository(dbClient);
    }

    return this.instance;
  }

  public async create(data: Help): Promise<void> {
    const params = {
      TableName: this.tableName,
      Item: {
        id: { S: data.id },
        title: { S: data.title },
        description: { S: data.description },
        userRelped: { S: data.userRelped },
        userName: { S: data.userName },
        value: { S: String(data.value) },
        pixKey: { S: data.pixKey },
        deadline: { S: data.deadline },
        category: { S: data.category },
        imgUrl: { S: data.imgUrl },
      },
    };

    try {
      const command = new PutItemCommand(params);
      await this.dbClient.send(command);
    } catch (error) {
      console.log('create error', error);
      throw new InternalServerError(
        error.message || 'Ocorreu um erro ao criar help',
      );
    }
  }

  public async findById(id: string): Promise<Help | undefined> {
    const params = {
      TableName: this.tableName,
      IndexName: 'IdIndex',
      KeyConditionExpression: '#id = :id',
      ExpressionAttributeNames: { '#id': 'id' },
      ExpressionAttributeValues: { ':id': { S: id } },
    };

    try {
      const command = new QueryCommand(params);
      const result = await this.dbClient.send(command);

      if (result?.Items && result?.Items.length > 0) {
        const item = result?.Items[0];

        return {
          id: item.id.S,
          title: item.title.S,
          description: item.description.S,
          userRelped: item.userRelped.S,
          userName: item.userName.S,
          value: parseFloat(item.value.S),
          pixKey: item.pixKey.S,
          deadline: item.deadline.S,
          category: item.category.S as HelpCategory,
          imgUrl: item.imgUrl.S,
        };
      }

      return undefined;
    } catch (error) {
      throw new InternalServerError(
        error.message || 'Ocorreu um erro ao buscar help por id',
      );
    }
  }

  public async delete(id: string): Promise<void> {
    const params = {
      TableName: this.tableName,
      Key: {
        id: { S: id },
      },
    };

    try {
      const command = new DeleteItemCommand(params);
      await this.dbClient.send(command);
    } catch (error) {
      console.log('delete error', error);
      throw new InternalServerError(
        error.message || 'Ocorreu um erro ao deletar help',
      );
    }
  }

  public async update(id: string, data: Help): Promise<void> {
    const params = {
      TableName: this.tableName,
      IndexName: 'IdIndex',
      Key: {
        id: { S: id },
      },
      UpdateExpression:
        `set #title = :title, #description = :description, #userRelped = :userRelped, #userName = :userName,
        #value = :value, #pixKey = :pixKey, #deadline = :deadline, #category = :category, #imgUrl = :imgUrl`.trim(),
      ExpressionAttributeNames: {
        '#name': 'name',
        '#email': 'email',
        '#fone': 'fone',
        '#password': 'password',
      },
      ExpressionAttributeValues: {
        ':id': { S: data.id },
        ':title': { S: data.title },
        ':description': { S: data.description },
        ':userRelped': { S: data.userRelped },
        ':userName': { S: data.userName },
        ':value': { S: String(data.value) },
        ':pixKey': { S: data.pixKey },
        ':deadline': { S: data.deadline },
        ':category': { S: data.category },
        ':imgUrl': { S: data.imgUrl },
      },
      ReturnValues: ReturnValue.UPDATED_NEW,
    };

    try {
      const command = new UpdateItemCommand(params);
      await this.dbClient.send(command);
    } catch (error) {
      console.log('updateById error', error);
      throw new InternalServerError(
        error.message || 'Ocorreu um erro ao atualizar help',
      );
    }
  }
}
