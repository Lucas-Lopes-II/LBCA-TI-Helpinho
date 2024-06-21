import { randomUUID } from 'node:crypto';
import { IUsersRepository } from '@users/data';
import { CreateUser } from './create-user.usecase';
import { ConflictError } from '@shared/domain/errors';
import { Validation } from '@shared/domain/validations';
import { IHasher } from '@shared/infra/crypto/hasher';

describe('CreateUserUseCase unit tests', () => {
  const mockedInput: CreateUser.Input = {
    name: 'test',
    email: 'test@example.com',
    fone: '8599856233',
    password: 'Test@123',
  };

  let sut: CreateUser.UseCase;
  let mockedUserRepo: IUsersRepository;
  let mockedValidator: Validation;
  let mockedHasher: IHasher;

  beforeEach(() => {
    mockedUserRepo = {
      create: jest.fn().mockResolvedValue(null),
      findByEmail: jest.fn().mockResolvedValue(null),
    } as any as IUsersRepository;
    mockedValidator = {
      validate: jest.fn().mockResolvedValue(null),
    } as any as Validation;
    mockedHasher = {
      hash: jest.fn().mockResolvedValue('hashed password'),
    } as any as IHasher;
    sut = new CreateUser.UseCase(mockedUserRepo, mockedValidator, mockedHasher);
  });

  it('should create an user', async () => {
    await sut.execute(mockedInput);

    expect(mockedUserRepo.findByEmail).toHaveBeenCalledTimes(1);
    expect(mockedValidator.validate).toHaveBeenCalledTimes(1);
    expect(mockedHasher.hash).toHaveBeenCalledTimes(1);
    expect(mockedUserRepo.create).toHaveBeenCalledTimes(1);
  });

  it('should throw a ConflictError if mockedUserRepo.findByEmail return true', async () => {
    jest
      .spyOn(mockedUserRepo, 'findByEmail')
      .mockResolvedValueOnce({ ...mockedInput, id: randomUUID() });

    expect(sut.execute(mockedInput)).rejects.toThrow(
      new ConflictError('Já existe registro com este email'),
    );
  });

  it('should throw if mockedUserDataGateway.findByEmail throws', async () => {
    jest.spyOn(mockedUserRepo, 'findByEmail').mockImplementationOnce(() => {
      throw new Error('');
    });

    expect(sut.execute(mockedInput)).rejects.toThrow();
  });

  it('should throw if validator.validate throws', async () => {
    jest.spyOn(mockedValidator, 'validate').mockImplementationOnce(() => {
      throw new Error('');
    });

    expect(sut.execute(mockedInput)).rejects.toThrow();
  });

  it('should throw if hasher.hash throws', async () => {
    jest.spyOn(mockedHasher, 'hash').mockImplementationOnce(() => {
      throw new Error('');
    });

    expect(sut.execute(mockedInput)).rejects.toThrow();
  });

  it('should throw if userWritingRepo.create throws', async () => {
    jest.spyOn(mockedUserRepo, 'create').mockImplementationOnce(() => {
      throw new Error('');
    });

    expect(sut.execute(mockedInput)).rejects.toThrow();
  });
});
