import { IUsersRepository, User } from '@users/data';
import { IHasher } from '@shared/infra/crypto/hasher';
import { Validation } from '@shared/domain/validations';
import { ChangePassword } from './change-password.usecase';
import { randomUUID } from 'crypto';
import { ForbiddenError, NotFoundError } from '@shared/domain/errors';

describe('ChangePassword.UseCase unit tests', () => {
  const mockedInput: ChangePassword.Input = {
    actionDoneBy: randomUUID(),
    newPassword: 'Test@456',
    currentPassword: 'Test@123',
  };
  const user: User = {
    id: mockedInput.actionDoneBy,
    name: 'Test',
    email: 'email@test.com',
    fone: '558596632147',
    password: 'hashedPassword',
  };

  let sut: ChangePassword.UseCase;
  let mockedUserRepo: IUsersRepository;
  let mockedValidator: Validation;
  let mockedHasher: IHasher;

  beforeEach(() => {
    mockedUserRepo = {
      update: jest.fn().mockResolvedValue(null),
      findById: jest.fn().mockResolvedValue(user),
    } as any as IUsersRepository;
    mockedValidator = {
      validate: jest.fn().mockResolvedValue(null),
    } as any as Validation;
    mockedHasher = {
      compare: jest.fn().mockResolvedValue(true),
      hash: jest.fn().mockResolvedValue('hashed password'),
    } as any as IHasher;
    sut = new ChangePassword.UseCase(
      mockedUserRepo,
      mockedValidator,
      mockedHasher,
    );
  });

  it('should change password of user', async () => {
    await sut.execute(mockedInput);

    expect(mockedValidator.validate).toHaveBeenCalledTimes(1);
    expect(mockedUserRepo.findById).toHaveBeenCalledTimes(1);
    expect(mockedHasher.compare).toHaveBeenCalledTimes(1);
    expect(mockedHasher.hash).toHaveBeenCalledTimes(1);
    expect(mockedUserRepo.update).toHaveBeenCalledTimes(1);
  });

  it('should throw if validator.validate throws', async () => {
    jest.spyOn(mockedValidator, 'validate').mockImplementationOnce(() => {
      throw new Error('');
    });

    expect(sut.execute(mockedInput)).rejects.toThrow();
  });

  it('should throw a NotFoundError if mockedUserRepo.findById return undefined', async () => {
    jest.spyOn(mockedUserRepo, 'findById').mockResolvedValueOnce(undefined);

    expect(sut.execute(mockedInput)).rejects.toThrow(
      new NotFoundError('Usuário não existe'),
    );
  });

  it('should throw if mockedUserRepo.findById throws', async () => {
    jest.spyOn(mockedUserRepo, 'findById').mockImplementationOnce(() => {
      throw new Error('');
    });

    expect(sut.execute(mockedInput)).rejects.toThrow();
  });

  it('should throw a ForbiddenError if hasher.compare return false', async () => {
    jest.spyOn(mockedHasher, 'compare').mockResolvedValueOnce(false);

    expect(sut.execute(mockedInput)).rejects.toThrow(
      new ForbiddenError('Senha atual incorreta'),
    );
  });

  it('should throw if hasher.compare throws', async () => {
    jest.spyOn(mockedHasher, 'compare').mockImplementationOnce(() => {
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

  it('should throw if userWritingRepo.update throws', async () => {
    jest.spyOn(mockedUserRepo, 'update').mockImplementationOnce(() => {
      throw new Error('');
    });

    expect(sut.execute(mockedInput)).rejects.toThrow();
  });
});
