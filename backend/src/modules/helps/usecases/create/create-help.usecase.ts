import { randomUUID } from 'node:crypto';
import { IUsersRepository } from '@users/data';
import { IStorage } from '@shared/infra/storage';
import { FileDTO } from '@shared/infra/storage/dtos';
import { NotFoundError } from '@shared/domain/errors';
import { Validation } from '@shared/domain/validations';
import { HelpCategory, IHelpsRepository } from '@helps/data';
import { DefaultUseCase } from '@shared/application/usecases';

export namespace CreateHelp {
  export type Input = {
    title: string;
    description: string;
    userRelped: string;
    value: number;
    pixKey: string;
    deadline: string;
    category: HelpCategory;
    file: FileDTO;
  };

  export type Output = void;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private readonly repository: IHelpsRepository,
      private readonly userRepository: IUsersRepository,
      private readonly validator: Validation,
      private readonly storage: IStorage,
    ) {}

    public async execute(input: Input): Promise<Output> {
      this.validator.validate(input);

      const user = await this.userRepository.findById(input.userRelped);
      if (!user) {
        throw new NotFoundError('Usuário não criador não encontrado');
      }

      const { fileUrl } = await this.storage.upload(input.file, 'hepls');
      await this.repository.create({
        id: randomUUID(),
        title: input.title,
        description: input.description,
        deadline: input.deadline,
        pixKey: input.pixKey,
        userRelped: input.userRelped,
        value: input.value,
        category: input.category,
        userName: user.name,
        imgUrl: fileUrl,
      });
    }
  }
}
