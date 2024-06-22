import { randomUUID } from 'node:crypto';
import { IUsersRepository } from '@users/data';
import { DeleteUser } from './delete-user.usecase';
import { Validation } from '@shared/domain/validations';
import { ForbiddenError, NotFoundError } from '@shared/domain/errors';

describe('DeleteUser.UseCase unit tests', () => {
  const id = randomUUID();
  const mockedInput: DeleteUser.Input = {
    actionDoneBy: id,
    userId: id,
  };

  let sut: DeleteUser.UseCase;
  let mockedUserRepo: IUsersRepository;
  let mockedValidator: Validation;

  beforeEach(() => {
    mockedUserRepo = {
      delete: jest.fn().mockResolvedValue(null),
      findById: jest.fn().mockResolvedValue({}),
    } as any as IUsersRepository;
    mockedValidator = {
      validate: jest.fn().mockResolvedValue(null),
    } as any as Validation;
    sut = new DeleteUser.UseCase(mockedUserRepo, mockedValidator);
  });

  it('should delete an user', async () => {
    await sut.execute(mockedInput);

    expect(mockedValidator.validate).toHaveBeenCalledTimes(1);
    expect(mockedUserRepo.findById).toHaveBeenCalledTimes(1);
    expect(mockedUserRepo.delete).toHaveBeenCalledTimes(1);
  });

  it('should throw a ForbiddenError if action was not done by own user', async () => {
    const data = {
      actionDoneBy: id,
      userId: randomUUID(),
    };

    expect(sut.execute(data)).rejects.toThrow(
      new ForbiddenError('Ação não permitida'),
    );
  });

  it('should throw a NotFoundError if mockedUserRepo.findById return undefined', async () => {
    jest.spyOn(mockedUserRepo, 'findById').mockResolvedValueOnce(undefined);

    expect(sut.execute(mockedInput)).rejects.toThrow(
      new NotFoundError('Usuário não existe'),
    );
  });

  it('should throw if mockedValidator.validate throws', async () => {
    jest.spyOn(mockedValidator, 'validate').mockImplementationOnce(() => {
      throw new Error('');
    });

    expect(sut.execute(mockedInput)).rejects.toThrow();
  });

  it('should throw if mockedUserRepo.findById throws', async () => {
    jest.spyOn(mockedUserRepo, 'findById').mockImplementationOnce(() => {
      throw new Error('');
    });

    expect(sut.execute(mockedInput)).rejects.toThrow();
  });

  it('should throw if mockedUserRepo.delete throws', async () => {
    jest.spyOn(mockedUserRepo, 'delete').mockImplementationOnce(() => {
      throw new Error('');
    });

    expect(sut.execute(mockedInput)).rejects.toThrow();
  });
});
