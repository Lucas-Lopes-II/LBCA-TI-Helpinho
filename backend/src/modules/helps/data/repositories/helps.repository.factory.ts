import { DatabaseUtils } from '@shared/infra/data';
import { IHelpsRepository, HelpsRepository } from '@helps/data';

export class HelpsRepositoryFactory {
  public static create(): IHelpsRepository {
    return HelpsRepository.createInstance(DatabaseUtils.dbClient);
  }
}
