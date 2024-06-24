import { DatabaseUtils } from '@shared/infra/data';
import { IUsersRepository, UsersRepository } from '@users/data';

export class UsersRepositoryFactory {
  public static create(): IUsersRepository {
    return UsersRepository.createInstance(DatabaseUtils.dbClient);
  }
}
