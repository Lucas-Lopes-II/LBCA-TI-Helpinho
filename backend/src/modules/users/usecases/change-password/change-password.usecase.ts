import { DefaultUseCase } from '@shared/application/usecases';
import { ForbiddenError, NotFoundError } from '@shared/domain/errors';
import { Validation } from '@shared/domain/validations';
import { IHasher } from '@shared/infra/crypto/hasher';
import { IUsersRepository } from '@users/data';

export namespace ChangePassword {
  export type Input = {
    actionDoneBy: string;
    currentPassword: string;
    newPassword: string;
  };

  export type Output = void;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private readonly userRepository: IUsersRepository,
      private readonly validator: Validation,
      private readonly hasher: IHasher,
    ) {}

    public async execute(input: Input): Promise<Output> {
      this.validator.validate(input);

      const user = await this.userRepository.findById(input.actionDoneBy);
      if (!user) {
        throw new NotFoundError('Usuário não existe');
      }

      const currentPasswordIsCorrect = await this.hasher.compare(
        input.currentPassword,
        user.password,
      );
      if (!currentPasswordIsCorrect) {
        throw new ForbiddenError('Senha atual incorreta');
      }

      const newPasswordHashed = await this.hasher.hash(input.newPassword);
      await this.userRepository.update(user.id, {
        ...user,
        password: newPasswordHashed,
      });
    }
  }
}
