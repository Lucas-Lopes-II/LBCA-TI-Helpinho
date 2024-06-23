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
import {
  CreateHelp,
  DeleteHelp,
  FindHelpById,
  SearchHelp,
} from '@helps/usecases';
import { UsersRepositoryFactory } from '@users/data';
import { StorageFactory } from '@shared/infra/storage';
import { hasherFactory } from '@shared/infra/crypto/hasher';
import { DefaultUseCase } from '@shared/application/usecases';
import {
  HelpCategory,
  HelpFilteredFilds,
  HelpsRepositoryFactory,
} from '@helps/data';

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

  public static deleteHelp(): DefaultUseCase<
    DeleteHelp.Input,
    DeleteHelp.Output
  > {
    const validators: Validation<DeleteHelp.Input>[] = [
      new UUIDValidation('actionDoneBy'),
      new UUIDValidation('helpId'),
    ];
    const validator = new ValidationComposite(validators);

    return new DeleteHelp.UseCase(this.repository, validator, this.storage);
  }

  public static findHelpById(): DefaultUseCase<
    FindHelpById.Input,
    FindHelpById.Output
  > {
    const validators: Validation<FindHelpById.Input>[] = [
      new UUIDValidation('helpId'),
    ];
    const validator = new ValidationComposite(validators);

    return new FindHelpById.UseCase(this.repository, validator);
  }

  public static searchHelp(): DefaultUseCase<
    SearchHelp.Input,
    SearchHelp.Output
  > {
    const validators: Validation<SearchHelp.Input>[] = [
      new MinLengthFieldValidation('filter', 2, false),
      new MaxLengthFieldValidation('filter', 50, false),
      new MinLengthFieldValidation('sortDir', 3, false),
      new MaxLengthFieldValidation('sortDir', 4, false),
      new MinValueFieldValidation('page', 0, false),
      new MinValueFieldValidation('perPage', 1, false),
      new MaxValueFieldValidation('perPage', 100, false),
      new MinLengthFieldValidation('sort', 2, false),
      new MaxLengthFieldValidation('sort', 50, false),
      new EnumValidation(
        'field',
        HelpFilteredFilds,
        'HelpFilteredFilds',
        false,
      ),
    ];
    const validator = new ValidationComposite(validators);

    return new SearchHelp.UseCase(this.repository, validator);
  }
}
