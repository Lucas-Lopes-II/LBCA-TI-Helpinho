import { DefaultUseCase } from '@shared/application/usecases';
import { BadRequestError } from '@shared/domain/errors';
import { IHasher } from '@shared/infra/crypto/hasher';
import { IUsersRepository } from '@users/data';

export namespace Signin {
  export type Input = {
    email: string;
    password: string;
  };

  export type Output = {
    id: string;
    name: string;
    email: string;
  };

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private readonly userRepository: IUsersRepository,
      private readonly hasher: IHasher,
    ) {}

    async execute(input: Input): Promise<Output> {
      const user = await this.userRepository.findByEmail(input.email);

      if (user) {
        const isPasswordValid = await this.hasher.compare(
          input.password,
          user.password,
        );

        if (isPasswordValid) {
          return {
            id: user['id'],
            name: user['name'],
            email: user['email'],
          };
        }
      }

      throw new BadRequestError('E-mail ou Senha incorreto');
    }
  }
}
