import { clientDB } from '@shared/infra/data/dynamoDB-client';
import { IHelpsRepository, HelpsRepository } from '@helps/data';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

export class HelpsRepositoryFactory {
  private static readonly docClient = DynamoDBDocumentClient.from(clientDB);

  public static create(): IHelpsRepository {
    return HelpsRepository.createInstance(clientDB, this.docClient);
  }
}
