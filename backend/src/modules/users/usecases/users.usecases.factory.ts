import { UsersRepositoryFactory } from '@users/data';
import { CreateUser } from './create/create-user.usecase';
import { hasherFactory } from '@shared/infra/crypto/hasher';
import { DefaultUseCase } from '@shared/application/usecases';
import {
  EmailValidation,
  MaxLengthFieldValidation,
  MinLengthFieldValidation,
  StrongPasswordValidation,
  Validation,
  ValidationComposite,
} from '@shared/domain/validations';

export class UsersUseCasesFactory {
  public static readonly userRepository = UsersRepositoryFactory.create();

  public static createUser(): DefaultUseCase<
    CreateUser.Input,
    CreateUser.Output
  > {
    const validators: Validation<CreateUser.Input>[] = [
      new MinLengthFieldValidation('name', 2),
      new MaxLengthFieldValidation('name', 100),

      new EmailValidation('email'),

      new MinLengthFieldValidation('fone', 2),
      new MaxLengthFieldValidation('fone', 13),

      new StrongPasswordValidation('password'),
    ];
    const validator = new ValidationComposite(validators);
    const hasher = hasherFactory();

    return new CreateUser.UseCase(this.userRepository, validator, hasher);
  }
}
