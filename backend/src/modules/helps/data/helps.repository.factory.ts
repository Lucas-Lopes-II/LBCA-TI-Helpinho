import { clientDB } from '@shared/infra/data/dynamoDB-client';
import { IHelpsRepository, HelpsRepository } from '@helps/data';

export class HelpsRepositoryFactory {
  public static create(): IHelpsRepository {
    return HelpsRepository.createInstance(clientDB);
  }
}
