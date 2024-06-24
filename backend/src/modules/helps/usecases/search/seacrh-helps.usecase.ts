import {
  SearchParams,
  SearchProps,
  SearchResultProps,
} from '@shared/infra/data';

import { Help, IHelpsRepository } from '@helps/data';
import { DefaultUseCase } from '@shared/application/usecases';
import { Validation } from '@shared/domain/validations';

export namespace SearchHelp {
  export type Input = SearchProps;

  export type Output = SearchResultProps<Help>;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private readonly repository: IHelpsRepository,
      private readonly validator: Validation,
    ) {}

    public async execute(input: Input): Promise<Output> {
      this.validator.validate(input);

      return this.repository.search(new SearchParams(input));
    }
  }
}
