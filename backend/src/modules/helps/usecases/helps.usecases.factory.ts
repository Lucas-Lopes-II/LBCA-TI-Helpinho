import {
  EnumValidation,
  ISODateValidation,
  MaxLengthFieldValidation,
  MaxValueFieldValidation,
  MinLengthFieldValidation,
  MinValueFieldValidation,
  UUIDValidation,
  Validation,
  ValidationComposite,
} from '@shared/domain/validations';
import { CreateHelp } from '@helps/usecases';
import { UsersRepositoryFactory } from '@users/data';
import { StorageFactory } from '@shared/infra/storage';
import { hasherFactory } from '@shared/infra/crypto/hasher';
import { DefaultUseCase } from '@shared/application/usecases';
import { HelpCategory, HelpsRepositoryFactory } from '@helps/data';

export class HelpsUseCasesFactory {
  private static readonly repository = HelpsRepositoryFactory.create();
  private static readonly usersRepository = UsersRepositoryFactory.create();
  private static readonly hasher = hasherFactory();
  private static readonly storage = StorageFactory.create();

  public static createHelp(): DefaultUseCase<
    CreateHelp.Input,
    CreateHelp.Output
  > {
    const validators: Validation<CreateHelp.Input>[] = [
      new MinLengthFieldValidation('title', 2),
      new MaxLengthFieldValidation('title', 50),
      new MinLengthFieldValidation('description', 2),
      new MaxLengthFieldValidation('description', 200),
      new MinLengthFieldValidation('pixKey', 2),
      new MaxLengthFieldValidation('pixKey', 100),
      new UUIDValidation('userRelped'),
      new ISODateValidation('deadline'),
      new MinValueFieldValidation('value', 0.1),
      new MaxValueFieldValidation('value', 10000000),
      new EnumValidation('category', HelpCategory, 'help category enum'),
    ];
    const validator = new ValidationComposite(validators);

    return new CreateHelp.UseCase(
      this.repository,
      this.usersRepository,
      validator,
      this.storage,
    );
  }
}
