import {
  FilterIndexes,
  SearchParams,
  SearchProps,
  SearchResultProps,
} from '@shared/infra/data';
import { Validation } from '@shared/domain/validations';
import { DefaultUseCase } from '@shared/application/usecases';
import { Help, HelpsFields, HelpsIndexes, IHelpsRepository } from '@helps/data';

export namespace SearchHelpsByFilter {
  export type Input = SearchProps &
    FilterIndexes<HelpsIndexes, HelpsFields, string>;

  export type Output = SearchResultProps<Help>;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private readonly repository: IHelpsRepository,
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
