import { DefaultUseCase } from '@shared/application/usecases';
import { ConflictError } from '@shared/domain/errors';
import { Validation } from '@shared/domain/validations';
import { IUsersRepository } from '@users/data';
import { randomUUID } from 'crypto';

export namespace CreateUser {
  export type Input = {
    name: string;
    email: string;
    fone: string;
    password: string;
  };

  export type Output = void;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private readonly userRepository: IUsersRepository,
      private readonly validator: Validation,
    ) {}

    public async execute(input: Input): Promise<Output> {
      this.validator.validate(input);
      const hasUserWithGivenEmail = await this.userRepository.findByEmail(
        input.email,
      );
      if (hasUserWithGivenEmail) {
        throw new ConflictError('Já existe registro com este email');
      }

      this.userRepository.create({
        id: randomUUID(),
        email: input.email,
        name: input.name,
        fone: input.fone,
        password: input.password,
      });
    }
  }
}
