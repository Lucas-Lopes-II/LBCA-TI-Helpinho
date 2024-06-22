import { Signin, GenerateSigninToken } from '@auth/usecases';
import { DefaultUseCase } from '@shared/application/usecases';
import { hasherFactory, IHasher } from '@shared/infra/crypto/hasher';
import { IJsonWebToken, JwtFactory } from '@shared/infra/jwt';
import { IUsersRepository, UsersRepositoryFactory } from '@users/data';

export class AuthUseCasesFactory {
  private static readonly repo: IUsersRepository =
    UsersRepositoryFactory.create();
  private static readonly hasher: IHasher = hasherFactory();
  private static readonly jsonWebToken: IJsonWebToken = JwtFactory.create();

  public static signin(): DefaultUseCase<Signin.Input, Signin.Output> {
    return new Signin.UseCase(this.repo, this.hasher);
  }

  public static generateSigninToken(): DefaultUseCase<
    GenerateSigninToken.Input,
    GenerateSigninToken.Output
  > {
    return new GenerateSigninToken.UseCase(this.jsonWebToken);
  }
}
