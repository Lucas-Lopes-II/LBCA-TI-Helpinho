import { randomUUID } from 'node:crypto';
import { IUsersRepository } from '@users/data';
import { IStorage } from '@shared/infra/storage';
import { FileDTO } from '@shared/infra/storage/dtos';
import { NotFoundError } from '@shared/domain/errors';
import { Validation } from '@shared/domain/validations';
import { Help, HelpCategory, IHelpsRepository } from '@helps/data';
import { DefaultUseCase } from '@shared/application/usecases';

export namespace CreateHelp {
  export type Input = {
    title: string;
    description: string;
    userHelped: string;
    value: number;
    pixKey: string;
    deadline: string;
    category: HelpCategory;
    file: FileDTO;
  };

  export type Output = Help;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private readonly repository: IHelpsRepository,
      private readonly userRepository: IUsersRepository,
      private readonly validator: Validation,
      private readonly storage: IStorage,
    ) {}

    public async execute(input: Input): Promise<Output> {
      this.validator.validate(input);

      const user = await this.userRepository.findById(input.userHelped);
      if (!user) {
        throw new NotFoundError('Usuário criador não encontrado');
      }

      const { fileUrl } = await this.storage.upload(
        input.file,
        'hepls',
        user.id,
      );
      const help = {
        id: randomUUID(),
        title: input.title,
        description: input.description,
        deadline: input.deadline,
        pixKey: input.pixKey,
        userHelped: input.userHelped,
        value: input.value,
        helpValue: 0.0,
        category: input.category,
        userName: user.name,
        imgUrl: fileUrl,
      };
      try {
        await this.repository.create(help);

        return help;
      } catch (error) {
        await this.storage.delete(fileUrl);
        throw error;
      }
    }
  }
}
