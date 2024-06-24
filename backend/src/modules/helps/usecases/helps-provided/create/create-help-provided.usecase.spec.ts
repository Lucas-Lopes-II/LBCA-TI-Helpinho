import { randomUUID } from 'crypto';
import { IUsersRepository, User } from '@users/data';
import { IHelpsProvidedRepository } from '@helps/data';
import { Validation } from '@shared/domain/validations';
import { CreateHelpProvided } from './create-help-provided.usecase';
import { NotFoundError } from 'rxjs';

describe('CreateHelpProvided.UseCase unit tests', () => {
  const mockedInput: CreateHelpProvided.Input = {
    helpId: randomUUID(),
    userRelped: randomUUID(),
    actionDoneBy: randomUUID(),
    executionDate: new Date().toISOString(),
    value: 500.0,
  };
  const user: User = {
    id: mockedInput.userRelped,
    name: 'Test',
    email: 'email@test.com',
    fone: '558596632147',
    password: 'hashedPassword',
  };

  let sut: CreateHelpProvided.UseCase;
  let mockedRepo: IHelpsProvidedRepository;
  let mockedUserRepo: IUsersRepository;
  let mockedValidator: Validation;

  beforeEach(() => {
    mockedRepo = {
      create: jest.fn().mockResolvedValue(null),
    } as any as IHelpsProvidedRepository;
    mockedUserRepo = {
      findById: jest.fn().mockResolvedValue(user),
    } as any as IUsersRepository;
    mockedValidator = {
      validate: jest.fn().mockResolvedValue(null),
    } as any as Validation;
    sut = new CreateHelpProvided.UseCase(
      mockedRepo,
      mockedUserRepo,
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

    expect(sut.execute(mockedInput)).rejects.toThrow();
  });

  it('should throw a NotFoundError if userRepo.findById return undefined', async () => {
    jest.spyOn(mockedUserRepo, 'findById').mockResolvedValueOnce(undefined);

    expect(sut.execute(mockedInput)).rejects.toThrow(
      new NotFoundError('Usuário não ajudado não encontrado'),
    );
  });

  it('should throw if userRepo.findById throws', async () => {
    jest.spyOn(mockedUserRepo, 'findById').mockImplementationOnce(() => {
      throw new Error('');
    });

    expect(sut.execute(mockedInput)).rejects.toThrow();
  });

  it('should throw if helpRepo.create throws', async () => {
    jest.spyOn(mockedRepo, 'create').mockImplementationOnce(() => {
      throw new Error('');
    });
    expect(sut.execute(mockedInput)).rejects.toThrow();
  });
});
