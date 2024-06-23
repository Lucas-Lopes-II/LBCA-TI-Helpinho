import { IHelpsRepository } from '@helps/data';
import { IStorage } from '@shared/infra/storage';
import { BadRequestError, ForbiddenError } from '@shared/domain/errors';
import { Validation } from '@shared/domain/validations';
import { DefaultUseCase } from '@shared/application/usecases';

export namespace DeleteHelp {
  export type Input = {
    helpId: string;
    actionDoneBy: string;
  };

  export type Output = void;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private readonly repository: IHelpsRepository,
      private readonly validator: Validation,
      private readonly storage: IStorage,
    ) {}

    public async execute(input: Input): Promise<Output> {
      this.validator.validate(input);

      const help = await this.repository.findById(input.helpId);
      if (!help) {
        throw new BadRequestError('help informado não existe');
      }

      const userIsNotHelpOwner = input.actionDoneBy !== help.userRelped;
      if (userIsNotHelpOwner) {
        throw new ForbiddenError('Ação não permitida');
      }

      await this.repository.delete(input.helpId);

      try {
        await this.storage.delete(help.imgUrl);
      } catch (error) {
        await this.repository.create(help);
        throw error;
      }
    }
  }
}
