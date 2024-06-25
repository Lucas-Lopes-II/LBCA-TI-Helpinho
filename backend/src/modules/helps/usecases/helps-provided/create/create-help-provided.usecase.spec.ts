import {
  Help,
  HelpCategory,
  IHelpsProvidedRepository,
  IHelpsRepository,
} from '@helps/data';
import { randomUUID } from 'node:crypto';
import { IUsersRepository, User } from '@users/data';
import { Validation } from '@shared/domain/validations';
import { CreateHelpProvided } from './create-help-provided.usecase';
import { InternalServerError, NotFoundError } from '@shared/domain/errors';

describe('CreateHelpProvided.UseCase unit tests', () => {
  const mockedInput: CreateHelpProvided.Input = {
    helpId: randomUUID(),
    userHelped: randomUUID(),
    actionDoneBy: randomUUID(),
    executionDate: new Date().toISOString(),
    value: 500.0,
  };
  const user: User = {
    id: mockedInput.userHelped,
    name: 'Test',
    email: 'email@test.com',
    fone: '558596632147',
    password: 'hashedPassword',
  };
  const help: Help = {
    id: mockedInput.helpId,
    category: HelpCategory.HEALTH,
    title: 'title',
    description: 'description',
    pixKey: '4547897467899',
    userHelped: 'teste id',
    deadline: new Date().toISOString(),
    value: 500.0,
    helpValue: 100.0,
    userName: 'name',
    imgUrl: '',
  };

  let sut: CreateHelpProvided.UseCase;
  let mockedRepo: IHelpsProvidedRepository;
  let mockedUserRepo: IUsersRepository;
  let mockedHelpsRepo: IHelpsRepository;
  let mockedValidator: Validation;

  beforeEach(() => {
    mockedRepo = {
      create: jest.fn().mockResolvedValue(null),
      delete: jest.fn().mockResolvedValue(null),
    } as any as IHelpsProvidedRepository;
    mockedUserRepo = {
      findById: jest.fn().mockResolvedValue(user),
    } as any as IUsersRepository;
    mockedValidator = {
      validate: jest.fn().mockResolvedValue(null),
    } as any as Validation;
    mockedHelpsRepo = {
      findById: jest.fn().mockResolvedValue(help),
      update: jest.fn().mockResolvedValue(null),
    } as any as IHelpsRepository;
    sut = new CreateHelpProvided.UseCase(
      mockedRepo,
      mockedUserRepo,
      mockedHelpsRepo,
      mockedValidator,
    );
  });

  it('should create a help provided', async () => {
    await sut.execute(mockedInput);

    expect(mockedValidator.validate).toHaveBeenCalledTimes(1);
    expect(mockedUserRepo.findById).toHaveBeenCalledTimes(1);
    expect(mockedRepo.create).toHaveBeenCalledTimes(1);
  });

  it('should throw if validator.validate throws', async () => {
    jest.spyOn(mockedValidator, 'validate').mockImplementationOnce(() => {
      throw new Error('');
    });

    await expect(sut.execute(mockedInput)).rejects.toThrow();
  });

  it('should throw a NotFoundError if userRepo.findById return undefined', async () => {
    jest.spyOn(mockedUserRepo, 'findById').mockResolvedValueOnce(undefined);

    await expect(sut.execute(mockedInput)).rejects.toThrow(
      new NotFoundError('Usuário não ajudado não encontrado'),
    );
  });

  it('should throw if userRepo.findById throws', async () => {
    jest.spyOn(mockedUserRepo, 'findById').mockImplementationOnce(() => {
      throw new Error('');
    });

    await expect(sut.execute(mockedInput)).rejects.toThrow();
  });

  it('should throw a NotFoundError if helpsRepo.findById return undefined', async () => {
    jest.spyOn(mockedHelpsRepo, 'findById').mockResolvedValueOnce(undefined);

    await expect(sut.execute(mockedInput)).rejects.toThrow(
      new NotFoundError('Help não encontrado'),
    );
  });

  it('should throw if helpsRepo.findById throws', async () => {
    jest.spyOn(mockedHelpsRepo, 'findById').mockImplementationOnce(() => {
      throw new Error('');
    });

    await expect(sut.execute(mockedInput)).rejects.toThrow();
  });

  it('should throw a NotFoundError if helpsRepo.update return undefined', async () => {
    jest.spyOn(mockedHelpsRepo, 'update').mockImplementationOnce(() => {
      throw new Error('');
    });

    await expect(sut.execute(mockedInput)).rejects.toThrow(
      new InternalServerError('Ocorreu um erro ao criar help provide'),
    );
  });

  it('should throw if helpRepo.create throws', async () => {
    jest.spyOn(mockedRepo, 'create').mockImplementationOnce(() => {
      throw new Error('');
    });
    await expect(sut.execute(mockedInput)).rejects.toThrow();
  });
});
