import { IUsersRepository } from '@users/data';
import { Validation } from '@shared/domain/validations';
import { DefaultUseCase } from '@shared/application/usecases';
import { ForbiddenError, NotFoundError } from '@shared/domain/errors';

export namespace DeleteUser {
  export type Input = {
    actionDoneBy: string;
    userId: string;
  };

  export type Output = void;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private readonly userRepository: IUsersRepository,
      private readonly validator: Validation,
    ) {}

    public async execute({ actionDoneBy, userId }: Input): Promise<Output> {
      this.validator.validate({ userId, actionDoneBy });

      const actionIsNotDoneByOwnUser = actionDoneBy !== userId;
      if (actionIsNotDoneByOwnUser) {
        throw new ForbiddenError('Ação não permitida');
      }

      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new NotFoundError('Usuário não existe');
      }

      await this.userRepository.delete(userId);
    }
  }
}
