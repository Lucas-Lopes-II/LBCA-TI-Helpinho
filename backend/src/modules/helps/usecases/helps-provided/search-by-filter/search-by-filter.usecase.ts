import {
  FilterIndexes,
  HelpProvided,
  IHelpsProvidedRepository,
} from '@helps/data';
import {
  SearchParams,
  SearchProps,
  SearchResultProps,
} from '@shared/infra/data';
import { DefaultUseCase } from '@shared/application/usecases';
import { Validation } from '@shared/domain/validations';

export namespace SearchHelpSProvidedByFilter {
  export type Input = SearchProps & FilterIndexes<string>;

  export type Output = SearchResultProps<HelpProvided>;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private readonly repository: IHelpsProvidedRepository,
      private readonly validator: Validation,
    ) {}

    public async execute(input: Input): Promise<Output> {
      this.validator.validate(input);

      return this.repository.searchByFilter(
        new SearchParams({ page: input.page, perPage: input.perPage }),
        {
          field: input.field,
          index: input.index,
          value: input.value,
        },
      );
    }
  }
}
