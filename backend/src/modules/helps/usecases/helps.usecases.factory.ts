import {
  HelpCategory,
  HelpsProvidedFields,
  HelpsProvidedIndexes,
  HelpsProvidedRepositoryFactory,
  HelpsRepositoryFactory,
} from '@helps/data';
import {
  CreateHelp,
  CreateHelpProvided,
  DeleteHelp,
  FindHelpById,
  SearchHelp,
  SearchHelpsProvidedByFilter,
} from '@helps/usecases';
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
import { UsersRepositoryFactory } from '@users/data';
import { StorageFactory } from '@shared/infra/storage';
import { DefaultUseCase } from '@shared/application/usecases';

export class HelpsUseCasesFactory {
  private static readonly helpsRepository = HelpsRepositoryFactory.create();
  private static readonly usersRepository = UsersRepositoryFactory.create();
  private static readonly helpsProvidedRepository =
    HelpsProvidedRepositoryFactory.create();
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
      new UUIDValidation('userHelped'),
      new ISODateValidation('deadline'),
      new MinValueFieldValidation('value', 0.1),
      new MaxValueFieldValidation('value', 10000000),
      new EnumValidation('category', HelpCategory, 'help category enum'),
    ];
    const validator = new ValidationComposite(validators);

    return new CreateHelp.UseCase(
      this.helpsRepository,
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

    return new DeleteHelp.UseCase(
      this.helpsRepository,
      validator,
      this.storage,
    );
  }

  public static findHelpById(): DefaultUseCase<
    FindHelpById.Input,
    FindHelpById.Output
  > {
    const validators: Validation<FindHelpById.Input>[] = [
      new UUIDValidation('helpId'),
    ];
    const validator = new ValidationComposite(validators);

    return new FindHelpById.UseCase(this.helpsRepository, validator);
  }

  public static searchHelp(): DefaultUseCase<
    SearchHelp.Input,
    SearchHelp.Output
  > {
    const validators: Validation<SearchHelp.Input>[] = [
      new MinValueFieldValidation('page', 0, false),
      new MinValueFieldValidation('perPage', 1, false),
      new MaxValueFieldValidation('perPage', 100, false),
    ];
    const validator = new ValidationComposite(validators);

    return new SearchHelp.UseCase(this.helpsRepository, validator);
  }

  public static createHelpProvided(): DefaultUseCase<
    CreateHelpProvided.Input,
    CreateHelpProvided.Output
  > {
    const validators: Validation<CreateHelpProvided.Input>[] = [
      new UUIDValidation('userHelped'),
      new UUIDValidation('helpId'),
      new UUIDValidation('actionDoneBy'),
      new ISODateValidation('executionDate'),
      new MinValueFieldValidation('value', 0.1),
      new MaxValueFieldValidation('value', 10000000),
    ];
    const validator = new ValidationComposite(validators);

    return new CreateHelpProvided.UseCase(
      this.helpsProvidedRepository,
      this.usersRepository,
      this.helpsRepository,
      validator,
    );
  }

  public static searchHelpsProvidedByFilter(): DefaultUseCase<
    SearchHelpsProvidedByFilter.Input,
    SearchHelpsProvidedByFilter.Output
  > {
    const validators: Validation<SearchHelpsProvidedByFilter.Input>[] = [
      new MinValueFieldValidation('page', 0, false),
      new MinValueFieldValidation('perPage', 1, false),
      new MaxValueFieldValidation('perPage', 100, false),
      new EnumValidation('index', HelpsProvidedIndexes),
      new EnumValidation('field', HelpsProvidedFields),
      new UUIDValidation('value'),
    ];
    const validator = new ValidationComposite(validators);

    return new SearchHelpsProvidedByFilter.UseCase(
      this.helpsProvidedRepository,
      validator,
    );
  }
}
