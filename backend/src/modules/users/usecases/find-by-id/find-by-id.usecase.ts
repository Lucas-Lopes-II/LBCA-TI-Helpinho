import { IUsersRepository } from '@users/data';
import { NotFoundError } from '@shared/domain/errors';
import { Validation } from '@shared/domain/validations';
import { DefaultUseCase } from '@shared/application/usecases';

export namespace FindUserById {
  export type Input = {
    userId: string;
  };

  export type Output = {
    id: string;
    name: string;
    email: string;
    fone: string;
  };

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private readonly userRepository: IUsersRepository,
      private readonly validator: Validation,
    ) {}

    public async execute(input: Input): Promise<Output> {
      this.validator.validate(input);

      const user = await this.userRepository.findById(input.userId);
      if (!user) {
        throw new NotFoundError('Usuário não existe');
      }

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        fone: user.fone,
      };
    }
  }
}
