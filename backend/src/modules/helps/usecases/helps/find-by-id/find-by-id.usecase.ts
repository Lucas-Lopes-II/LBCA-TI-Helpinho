import { HelpCategory, IHelpsRepository } from '@helps/data';
import { NotFoundError } from '@shared/domain/errors';
import { Validation } from '@shared/domain/validations';
import { DefaultUseCase } from '@shared/application/usecases';

export namespace FindHelpById {
  export type Input = {
    helpId: string;
  };

  export type Output = {
    id: string;
    title: string;
    description: string;
    userRelped: string;
    userName: string;
    value: number;
    helpValue: number;
    pixKey: string;
    deadline: string;
    category: HelpCategory;
    imgUrl: string;
  };

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private readonly HelpRepository: IHelpsRepository,
      private readonly validator: Validation,
    ) {}

    public async execute(input: Input): Promise<Output> {
      this.validator.validate(input);

      const help = await this.HelpRepository.findById(input.helpId);
      if (!help) {
        throw new NotFoundError('Help não existe');
      }

      return {
        id: help.id,
        title: help.title,
        description: help.description,
        deadline: help.deadline,
        pixKey: help.pixKey,
        category: help.category,
        userName: help.userName,
        userRelped: help.userRelped,
        value: help.value,
        helpValue: help.helpValue,
        imgUrl: help.imgUrl,
      };
    }
  }
}
