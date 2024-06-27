import { randomUUID } from 'node:crypto';
import { IUsersRepository } from '@users/data';
import { InternalServerError, NotFoundError } from '@shared/domain/errors';
import { Validation } from '@shared/domain/validations';
import { IHelpsProvidedRepository, IHelpsRepository } from '@helps/data';
import { DefaultUseCase } from '@shared/application/usecases';

export namespace CreateHelpProvided {
  export type Input = {
    helpId: string;
    actionDoneBy: string;
    userHelped: string;
    value: number;
    executionDate: string;
  };

  export type Output = void;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private readonly repository: IHelpsProvidedRepository,
      private readonly userRepository: IUsersRepository,
      private readonly helpsRepository: IHelpsRepository,
      private readonly validator: Validation,
    ) {}

    public async execute(input: Input): Promise<Output> {
      this.validator.validate(input);

      const [user, help] = await Promise.all([
        this.userRepository.findById(input.userHelped),
        this.helpsRepository.findById(input.helpId),
      ]);
      if (!user) {
        throw new NotFoundError('Usuário ajudado não encontrado');
      }
      if (!help) {
        throw new NotFoundError('Help não encontrado');
      }
      const helpProvidedId = randomUUID();
      await this.repository.create({
        id: helpProvidedId,
        helpId: input.helpId,
        executionDate: input.executionDate,
        userDonor: input.actionDoneBy,
        userHelped: input.userHelped,
        value: input.value,
      });

      try {
        await this.helpsRepository.update(help.id, {
          ...help,
          helpValue: help.helpValue + input.value,
        });
      } catch (error) {
        await this.repository.delete(helpProvidedId);
        console.log('CreateHelpProvided.UseCase error', error);
        throw new InternalServerError('Ocorreu um erro ao criar help provide');
      }
    }
  }
}
