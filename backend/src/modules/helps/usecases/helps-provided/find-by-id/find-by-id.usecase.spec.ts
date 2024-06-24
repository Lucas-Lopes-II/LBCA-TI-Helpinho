import { randomUUID } from 'node:crypto';
import { NotFoundError } from '@shared/domain/errors';
import { Validation } from '@shared/domain/validations';
import { FindHelpProvidedById } from './find-by-id.usecase';
import { HelpProvided, IHelpsProvidedRepository } from '@helps/data';

describe('FindHelpProvidedById.UseCase unit tests', () => {
  const mockedInput: FindHelpProvidedById.Input = {
    helpProvidedId: randomUUID(),
  };
  const data: HelpProvided = {
    id: mockedInput.helpProvidedId,
    helpId: randomUUID(),
    userDonor: randomUUID(),
    userRelped: randomUUID(),
    value: 20.0,
    executionDate: new Date().toISOString(),
  };

  let sut: FindHelpProvidedById.UseCase;
  let mockedRepo: IHelpsProvidedRepository;
  let mockedValidator: Validation;

  beforeEach(() => {
    mockedRepo = {
      findById: jest.fn().mockResolvedValue(data),
    } as any as IHelpsProvidedRepository;
    mockedValidator = {
      validate: jest.fn().mockResolvedValue(null),
    } as any as Validation;
    sut = new FindHelpProvidedById.UseCase(mockedRepo, mockedValidator);
  });

  it('should find an Help by id', async () => {
    const result = await sut.execute(mockedInput);

    expect(result).toStrictEqual(data);
    expect(mockedValidator.validate).toHaveBeenCalledTimes(1);
    expect(mockedRepo.findById).toHaveBeenCalledTimes(1);
  });

  it('should throw if validator.validate throws', async () => {
    jest.spyOn(mockedValidator, 'validate').mockImplementationOnce(() => {
      throw new Error('');
    });

    expect(sut.execute(mockedInput)).rejects.toThrow();
  });

  it('should throw a NotFoundError if repo.findById return undefined', async () => {
    jest.spyOn(mockedRepo, 'findById').mockResolvedValueOnce(undefined);

    expect(sut.execute(mockedInput)).rejects.toThrow(
      new NotFoundError('Help provido não existe'),
    );
  });

  it('should throw if mockedRepo.findById throws', async () => {
    jest.spyOn(mockedRepo, 'findById').mockImplementationOnce(() => {
      throw new Error('');
    });

    expect(sut.execute(mockedInput)).rejects.toThrow();
  });
});
