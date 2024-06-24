import {
  HelpProvided,
  HelpsProvidedFields,
  HelpsProvidedIndexes,
  IHelpsProvidedRepository,
} from '@helps/data';
import { randomUUID } from 'node:crypto';
import { Validation } from '@shared/domain/validations';
import { SearchHelpSProvidedByFilter } from './search-by-filter.usecase';

describe('SearchHelpSProvidedByFilter.UseCase unit tests', () => {
  const mockedInput: SearchHelpSProvidedByFilter.Input = {
    page: 1,
    perPage: 2,
    index: HelpsProvidedIndexes.ID,
    field: HelpsProvidedFields.ID,
    value: randomUUID(),
  };
  const data: HelpProvided[] = [
    {
      id: randomUUID(),
      helpId: randomUUID(),
      userDonor: randomUUID(),
      userRelped: randomUUID(),
      value: 20.0,
      executionDate: new Date().toISOString(),
    },
    {
      id: randomUUID(),
      helpId: randomUUID(),
      userDonor: randomUUID(),
      userRelped: randomUUID(),
      value: 20.0,
      executionDate: new Date().toISOString(),
    },
  ];

  let sut: SearchHelpSProvidedByFilter.UseCase;
  let mockedRepo: IHelpsProvidedRepository;
  let mockedValidator: Validation;

  beforeEach(() => {
    mockedRepo = {
      searchByFilter: jest.fn().mockResolvedValue(data),
    } as any as IHelpsProvidedRepository;
    mockedValidator = {
      validate: jest.fn().mockResolvedValue(null),
    } as any as Validation;
    sut = new SearchHelpSProvidedByFilter.UseCase(mockedRepo, mockedValidator);
  });

  it('should search by filter a paginated list of Help provided', async () => {
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
