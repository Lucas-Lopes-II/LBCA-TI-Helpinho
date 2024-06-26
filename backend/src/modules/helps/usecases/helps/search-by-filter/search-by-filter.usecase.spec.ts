import {
  Help,
  HelpCategory,
  HelpsFields,
  HelpsIndexes,
  IHelpsRepository,
} from '@helps/data';
import { randomUUID } from 'node:crypto';
import { Validation } from '@shared/domain/validations';
import { SearchHelpsByFilter } from './search-by-filter.usecase';

describe('SearchHelpsByFilter.UseCase unit tests', () => {
  const mockedInput: SearchHelpsByFilter.Input = {
    page: 1,
    perPage: 2,
    index: HelpsIndexes.ID,
    field: HelpsFields.ID,
    value: randomUUID(),
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

  let sut: SearchHelpsByFilter.UseCase;
  let mockedRepo: IHelpsRepository;
  let mockedValidator: Validation;

  beforeEach(() => {
    mockedRepo = {
      searchByFilter: jest.fn().mockResolvedValue(data),
    } as any as IHelpsRepository;
    mockedValidator = {
      validate: jest.fn().mockResolvedValue(null),
    } as any as Validation;
    sut = new SearchHelpsByFilter.UseCase(mockedRepo, mockedValidator);
  });

  it('should search by filter a paginated list of Help ', async () => {
    const result = await sut.execute(mockedInput);

    expect(result).toStrictEqual(data);
    expect(mockedValidator.validate).toHaveBeenCalledTimes(1);
    expect(mockedRepo.searchByFilter).toHaveBeenCalledTimes(1);
  });

  it('should throw if validator.validate throws', async () => {
    jest.spyOn(mockedValidator, 'validate').mockImplementationOnce(() => {
      throw new Error('');
    });

    expect(sut.execute(mockedInput)).rejects.toThrow();
  });

  it('should throw if mockedRepo.searchByFilter throws', async () => {
    jest.spyOn(mockedRepo, 'searchByFilter').mockImplementationOnce(() => {
      throw new Error('');
    });

    expect(sut.execute(mockedInput)).rejects.toThrow();
  });
});
