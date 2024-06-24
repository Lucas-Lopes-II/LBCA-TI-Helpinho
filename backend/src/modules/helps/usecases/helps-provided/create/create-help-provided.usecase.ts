import { randomUUID } from 'node:crypto';
import { IUsersRepository } from '@users/data';
import { NotFoundError } from '@shared/domain/errors';
import { Validation } from '@shared/domain/validations';
import { IHelpsProvidedRepository } from '@helps/data';
import { DefaultUseCase } from '@shared/application/usecases';

export namespace CreateHelpProvided {
  export type Input = {
    helpId: string;
    userRelped: string;
    actionDoneBy: string;
    value: number;
    executionDate: string;
  };

  export type Output = void;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private readonly repository: IHelpsProvidedRepository,
      private readonly userRepository: IUsersRepository,
      private readonly validator: Validation,
    ) {}

    public async execute(input: Input): Promise<Output> {
      this.validator.validate(input);

      const user = await this.userRepository.findById(input.userRelped);
      if (!user) {
        throw new NotFoundError('Usuário não ajudado não encontrado');
      }

      await this.repository.create({
        id: randomUUID(),
        helpId: input.helpId,
        executionDate: input.executionDate,
        userDonor: input.actionDoneBy,
        userRelped: input.userRelped,
        value: input.value,
      });
    }
  }
}
