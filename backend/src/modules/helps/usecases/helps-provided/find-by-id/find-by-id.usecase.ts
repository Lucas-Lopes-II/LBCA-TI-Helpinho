import { IHelpsProvidedRepository } from '@helps/data';
import { NotFoundError } from '@shared/domain/errors';
import { Validation } from '@shared/domain/validations';
import { DefaultUseCase } from '@shared/application/usecases';

export namespace FindHelpProvidedById {
  export type Input = {
    helpProvidedId: string;
  };

  export type Output = {
    id: string;
    helpId: string;
    userRelped: string;
    userDonor: string;
    value: number;
    executionDate: string;
  };

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private readonly helpRepository: IHelpsProvidedRepository,
      private readonly validator: Validation,
    ) {}

    public async execute(input: Input): Promise<Output> {
      this.validator.validate(input);

      const help = await this.helpRepository.findById(input.helpProvidedId);
      if (!help) {
        throw new NotFoundError('Help não existe');
      }

      return {
        id: help.id,
        executionDate: help.executionDate,
        value: help.value,
        userDonor: help.userDonor,
        helpId: help.helpId,
        userRelped: help.userRelped,
      };
    }
  }
}
