import {
  DynamoDBClient,
  PutItemCommand,
  QueryCommand,
  ReturnValue,
  ScanCommand,
  UpdateItemCommand,
} from '@aws-sdk/client-dynamodb';
import { EnvConfigFactory } from '@shared/infra/env';
import { InternalServerError } from '@shared/domain/errors';
import { HelpProvided, IHelpsProvidedRepository } from '@helps/data';
import { DatabaseUtils, SearchParams, SearchResult } from '@shared/infra/data';

export class HelpsProvidedRepository implements IHelpsProvidedRepository {
  public static instance: HelpsProvidedRepository | null = null;
  public readonly tableName: string;

  private constructor(private readonly dbClient: DynamoDBClient) {
    const envConfig = EnvConfigFactory.create();
    this.tableName = envConfig.getHelpsTableName();
  }

  public static createInstance(
    dbClient: DynamoDBClient,
  ): HelpsProvidedRepository {
    if (!HelpsProvidedRepository.instance) {
      HelpsProvidedRepository.instance = new HelpsProvidedRepository(dbClient);
    }

    return this.instance;
  }

  public async create(data: HelpProvided): Promise<void> {
    const params = {
      TableName: this.tableName,
      Item: {
        id: { S: data.id },
        helpId: { S: data.helpId },
        userRelped: { S: data.userRelped },
        userDonor: { S: data.userDonor },
        executionDate: { S: data.executionDate },
        value: { S: String(data.value) },
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

  public async findById(id: string): Promise<HelpProvided | undefined> {
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
          helpId: item.helpId.S,
          userRelped: item.userRelped.S,
          userDonor: item.userDonor.S,
          executionDate: item.executionDate.S,
          value: parseFloat(item.value.S),
        };
      }

      return undefined;
    } catch (error) {
      throw new InternalServerError(
        error.message || 'Ocorreu um erro ao buscar help por id',
      );
    }
  }

  public async update(id: string, data: HelpProvided): Promise<void> {
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
        ':userDonor': { S: data.userDonor },
        ':helpId': { S: data.helpId },
        ':userRelped': { S: data.userRelped },
        ':executionDate': { S: data.executionDate },
        ':value': { S: String(data.value) },
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

  public async search(
    props?: SearchParams,
  ): Promise<SearchResult<HelpProvided>> {
    try {
      let exclusiveStartKey;
      const items = [];
      let interationCount = 1;
      const count = await DatabaseUtils.getTableCount(this.tableName);
      do {
        const command = new ScanCommand({
          TableName: this.tableName,
          Limit: props.perPage,
          ExclusiveStartKey: exclusiveStartKey,
        });
        const result = await this.dbClient.send(command);
        exclusiveStartKey = result.LastEvaluatedKey;

        if (items.length >= props.perPage) {
          break;
        }

        if (props.page == interationCount) {
          items.push(
            ...result.Items.map((item) => ({
              id: item.id.S,
              helpId: item.helpId.S,
              userRelped: item.userRelped.S,
              userDonor: item.userDonor.S,
              executionDate: item.executionDate.S,
              value: parseFloat(item.value.S),
            })),
          );
        } else {
          interationCount++;
        }
      } while (exclusiveStartKey);

      return new SearchResult({
        items: items,
        total: count,
        currentPage: props.page,
        perPage: props.perPage,
      });
    } catch (error) {
      console.log('search error', error);
      throw new InternalServerError(
        error.message || 'Ocorreu um erro ao listar helps',
      );
    }
  }
}