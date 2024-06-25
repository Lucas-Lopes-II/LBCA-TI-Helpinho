import { randomUUID } from 'crypto';
import { SearchHelp } from './seacrh-helps.usecase';
import { Validation } from '@shared/domain/validations';
import { Help, HelpCategory, IHelpsRepository } from '@helps/data';

describe('SearchHelp.UseCase unit tests', () => {
  const mockedInput: SearchHelp.Input = {
    page: 1,
    perPage: 2,
  };
  const data: Help[] = [
    {
      id: randomUUID(),
      category: HelpCategory.HEALTH,
      title: 'title',
      description: 'description',
      pixKey: '4547897467899',
      userHelped: 'teste id',
      deadline: new Date().toISOString(),
      value: 500.0,
      helpValue: 500.0,
      userName: 'name',
      imgUrl: '',
    },
    {
      id: randomUUID(),
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
    },
  ];

  let sut: SearchHelp.UseCase;
  let mockedRepo: IHelpsRepository;
  let mockedValidator: Validation;

  beforeEach(() => {
    mockedRepo = {
      search: jest.fn().mockResolvedValue(data),
    } as any as IHelpsRepository;
    mockedValidator = {
      validate: jest.fn().mockResolvedValue(null),
    } as any as Validation;
    sut = new SearchHelp.UseCase(mockedRepo, mockedValidator);
  });

  it('should search a paginated list of Help', async () => {
    const result = await sut.execute(mockedInput);

    expect(result).toStrictEqual(data);
    expect(mockedValidator.validate).toHaveBeenCalledTimes(1);
    expect(mockedRepo.search).toHaveBeenCalledTimes(1);
  });

  it('should throw if validator.validate throws', async () => {
    jest.spyOn(mockedValidator, 'validate').mockImplementationOnce(() => {
      throw new Error('');
    });

    expect(sut.execute(mockedInput)).rejects.toThrow();
  });

  it('should throw if mockedRepo.search throws', async () => {
    jest.spyOn(mockedRepo, 'search').mockImplementationOnce(() => {
      throw new Error('');
    });

    expect(sut.execute(mockedInput)).rejects.toThrow();
  });
});
