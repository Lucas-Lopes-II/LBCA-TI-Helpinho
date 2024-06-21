import { IUsersRepository, UsersRepository } from '@users/data';
import { clientDB } from '@shared/infra/data/dynamoDB-client';

export class UsersRepositoryFactory {
  public static create(): IUsersRepository {
    return UsersRepository.createInstance(clientDB);
  }
}
