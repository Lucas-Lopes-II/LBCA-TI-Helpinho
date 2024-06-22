import {
  EmailValidation,
  MaxLengthFieldValidation,
  MinLengthFieldValidation,
  StrongPasswordValidation,
  UUIDValidation,
  Validation,
  ValidationComposite,
} from '@shared/domain/validations';
import { UsersRepositoryFactory } from '@users/data';
import { DeleteUser } from './delete/delete-user.usecase';
import { CreateUser } from './create/create-user.usecase';
import { hasherFactory } from '@shared/infra/crypto/hasher';
import { DefaultUseCase } from '@shared/application/usecases';

export class UsersUseCasesFactory {
  private static readonly userRepository = UsersRepositoryFactory.create();
  private static readonly hasher = hasherFactory();

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

    return new CreateUser.UseCase(this.userRepository, validator, this.hasher);
  }

  public static deleteUser(): DefaultUseCase<
    DeleteUser.Input,
    DeleteUser.Output
  > {
    const validators: Validation<DeleteUser.Input>[] = [
      new UUIDValidation('userId'),
      new UUIDValidation('actionDoneBy'),
    ];
    const validator = new ValidationComposite(validators);

    return new DeleteUser.UseCase(this.userRepository, validator);
  }
}
