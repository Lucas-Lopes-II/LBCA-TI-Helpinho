import { randomUUID } from 'node:crypto';
import { FindHelpById } from './find-by-id.usecase';
import { NotFoundError } from '@shared/domain/errors';
import { Validation } from '@shared/domain/validations';
import { Help, HelpCategory, IHelpsRepository } from '@helps/data';

describe('FindHelpById.UseCase unit tests', () => {
  const mockedInput: FindHelpById.Input = {
    helpId: randomUUID(),
  };
  const data: Help = {
    id: mockedInput.helpId,
    category: HelpCategory.HEALTH,
    title: 'title',
    description: 'description',
    pixKey: '4547897467899',
    userRelped: 'teste id',
    deadline: new Date().toISOString(),
    value: 500.0,
    helpValue: 100.0,
    userName: 'name',
    imgUrl: '',
  };

  let sut: FindHelpById.UseCase;
  let mockedRepo: IHelpsRepository;
  let mockedValidator: Validation;

  beforeEach(() => {
    mockedRepo = {
      findById: jest.fn().mockResolvedValue(data),
    } as any as IHelpsRepository;
    mockedValidator = {
      validate: jest.fn().mockResolvedValue(null),
    } as any as Validation;
    sut = new FindHelpById.UseCase(mockedRepo, mockedValidator);
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
      new NotFoundError('Help não existe'),
    );
  });

  it('should throw if mockedRepo.findById throws', async () => {
    jest.spyOn(mockedRepo, 'findById').mockImplementationOnce(() => {
      throw new Error('');
    });

    expect(sut.execute(mockedInput)).rejects.toThrow();
  });
});
