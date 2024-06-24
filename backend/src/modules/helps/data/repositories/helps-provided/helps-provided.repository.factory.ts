import { DatabaseUtils } from '@shared/infra/data';
import { IHelpsProvidedRepository, HelpsProvidedRepository } from '@helps/data';

export class HelpsProvidedRepositoryFactory {
  public static create(): IHelpsProvidedRepository {
    return HelpsProvidedRepository.createInstance(DatabaseUtils.dbClient);
  }
}
