import { DefaultUseCase } from '@shared/application/usecases';
import { hasherFactory, IHasher } from '@shared/infra/crypto/hasher';
import { IUsersRepository, UsersRepositoryFactory } from '@users/data';
import { Signin } from './signin/signin.usecase';

export class AuthUseCasesFactory {
  private static readonly repo: IUsersRepository =
    UsersRepositoryFactory.create();
  private static readonly hasher: IHasher = hasherFactory();

  public static signin(): DefaultUseCase {
    return new Signin.UseCase(this.repo, this.hasher);
  }
}
