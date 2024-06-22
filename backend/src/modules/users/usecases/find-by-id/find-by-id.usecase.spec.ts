import { randomUUID } from 'node:crypto';
import { FindUserById } from './find-by-id.usecase';
import { IUsersRepository, User } from '@users/data';
import { NotFoundError } from '@shared/domain/errors';
import { Validation } from '@shared/domain/validations';

describe('FindUserById.UseCase unit tests', () => {
  const mockedInput: FindUserById.Input = {
    userId: randomUUID(),
  };
  const user: User = {
    id: mockedInput.userId,
    name: 'Test',
    email: 'email@test.com',
    fone: '558596632147',
    password: 'hashedPassword',
  };

  let sut: FindUserById.UseCase;
  let mockedUserRepo: IUsersRepository;
  let mockedValidator: Validation;

  beforeEach(() => {
    mockedUserRepo = {
      findById: jest.fn().mockResolvedValue(user),
    } as any as IUsersRepository;
    mockedValidator = {
      validate: jest.fn().mockResolvedValue(null),
    } as any as Validation;
    sut = new FindUserById.UseCase(mockedUserRepo, mockedValidator);
  });

  it('should find an user by id', async () => {
    const result = await sut.execute(mockedInput);

    expect(result).toStrictEqual({
      id: mockedInput.userId,
      name: 'Test',
      email: 'email@test.com',
      fone: '558596632147',
    });
    expect(mockedValidator.validate).toHaveBeenCalledTimes(1);
    expect(mockedUserRepo.findById).toHaveBeenCalledTimes(1);
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
});
