import {
  DeleteUser,
  CreateUser,
  ChangePassword,
  FindUserById,
} from '@users/usecases';
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

  public static changePassword(): DefaultUseCase<
    ChangePassword.Input,
    ChangePassword.Output
  > {
    const validators: Validation<ChangePassword.Input>[] = [
      new StrongPasswordValidation('newPassword'),
    ];
    const validator = new ValidationComposite(validators);

    return new ChangePassword.UseCase(
      this.userRepository,
      validator,
      this.hasher,
    );
  }

  public static findUserById(): DefaultUseCase<
    FindUserById.Input,
    FindUserById.Output
  > {
    const validators: Validation<FindUserById.Input>[] = [
      new UUIDValidation('userId'),
    ];
    const validator = new ValidationComposite(validators);

    return new FindUserById.UseCase(this.userRepository, validator);
  }
}
