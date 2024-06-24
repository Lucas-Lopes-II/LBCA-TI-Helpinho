import {
  Help,
  HelpCategory,
  HelpFilteredFilds,
  IHelpsRepository,
} from '@helps/data';
import {
  DeleteItemCommand,
  DynamoDBClient,
  PutItemCommand,
  QueryCommand,
  ReturnValue,
  ScanCommand,
  UpdateItemCommand,
} from '@aws-sdk/client-dynamodb';
import { EnvConfigFactory } from '@shared/infra/env';
import { InternalServerError } from '@shared/domain/errors';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { SearchParams, SearchResult } from '@shared/infra/data';

export class HelpsRepository implements IHelpsRepository {
  public static instance: HelpsRepository | null = null;
  public readonly tableName: string;

  private constructor(
    private readonly dbClient: DynamoDBClient,
    private readonly docClient: DynamoDBDocumentClient,
  ) {
    const envConfig = EnvConfigFactory.create();
    this.tableName = envConfig.getHelpsTableName();
  }

  public static createInstance(
    dbClient: DynamoDBClient,
    docClient: DynamoDBDocumentClient,
  ): HelpsRepository {
    if (!HelpsRepository.instance) {
      HelpsRepository.instance = new HelpsRepository(dbClient, docClient);
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

  public async search(
    props?: SearchParams<HelpFilteredFilds>,
  ): Promise<SearchResult<Help>> {
    try {
      let exclusiveStartKey;
      const items = [];
      let totalCount = 0;
      let itensCount = 0;
      do {
        const command = new ScanCommand({
          TableName: this.tableName,
          Limit: props.perPage,
          ExclusiveStartKey: exclusiveStartKey,
        });

        const result = await this.dbClient.send(command);

        if (!result.LastEvaluatedKey || items.length >= props.perPage) {
          break;
        }

        exclusiveStartKey = result.LastEvaluatedKey;

        console.log(result.Items);
        if ((props.page <= 1 ? 0 : props.page * props.perPage) === itensCount) {
          items.push(
            ...result.Items.map((item) => ({
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
            })),
          );
        } else {
          itensCount++;
        }

        totalCount += result.Count;
      } while (exclusiveStartKey);

      return new SearchResult({
        items: items,
        total: totalCount,
        currentPage: props.page,
        perPage: props.perPage,
        sort: props.sort,
        sortDir: props.sortDir,
        filter: props.filter,
      });
    } catch (error) {
      console.log('search error', error);
      throw new InternalServerError(
        error.message || 'Ocorreu um erro ao liestar helps',
      );
    }
  }
}
