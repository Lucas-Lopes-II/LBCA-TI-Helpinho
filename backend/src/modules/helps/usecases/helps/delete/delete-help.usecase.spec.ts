import { IStorage } from '@shared/infra/storage';
import { DeleteHelp } from './delete-help.usecase';
import { Validation } from '@shared/domain/validations';
import { Help, HelpCategory, IHelpsRepository } from '@helps/data';
import { BadRequestError, ForbiddenError } from '@shared/domain/errors';

describe('DeleteHelp.UseCase unit tests', () => {
  const mockedInput: DeleteHelp.Input = {
    actionDoneBy: 'id user',
    helpId: 'id help',
  };
  const data: Help = {
    id: mockedInput.helpId,
    category: HelpCategory.HEALTH,
    title: 'title',
    description: 'description',
    pixKey: '4547897467899',
    userRelped: mockedInput.actionDoneBy,
    deadline: new Date().toISOString(),
    value: 500.0,
    userName: 'name',
    imgUrl: '',
  };

  let sut: DeleteHelp.UseCase;
  let mockedRepo: IHelpsRepository;
  let mockedValidator: Validation;
  let mockedStorage: IStorage;

  beforeEach(() => {
    mockedRepo = {
      delete: jest.fn().mockResolvedValue(null),
      create: jest.fn().mockResolvedValue(null),
      findById: jest.fn().mockResolvedValue(data),
    } as any as IHelpsRepository;
    mockedValidator = {
      validate: jest.fn().mockResolvedValue(null),
    } as any as Validation;
    mockedStorage = {
      delete: jest.fn().mockResolvedValue(null),
    } as any as IStorage;
    sut = new DeleteHelp.UseCase(mockedRepo, mockedValidator, mockedStorage);
  });

  it('should delete a help', async () => {
    await sut.execute(mockedInput);

    expect(mockedValidator.validate).toHaveBeenCalledTimes(1);
    expect(mockedStorage.delete).toHaveBeenCalledTimes(1);
    expect(mockedRepo.delete).toHaveBeenCalledTimes(1);
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
      new BadRequestError('help informado não existe'),
    );
  });

  it('should throw if repo.findById throws', async () => {
    jest.spyOn(mockedRepo, 'findById').mockImplementationOnce(() => {
      throw new Error('');
    });

    expect(sut.execute(mockedInput)).rejects.toThrow();
  });

  it('should throw a ForbiddenError if user is not help owner', async () => {
    await expect(
      sut.execute({ ...mockedInput, actionDoneBy: 'other id' }),
    ).rejects.toThrow(new ForbiddenError('Ação não permitida'));
  });

  it('should throw if storage.delete throws', async () => {
    jest.spyOn(mockedStorage, 'delete').mockImplementationOnce(() => {
      throw new Error('');
    });

    expect(sut.execute(mockedInput)).rejects.toThrow();
  });

  it('should throw if helpRepo.delete throws', async () => {
    jest.spyOn(mockedRepo, 'delete').mockImplementationOnce(() => {
      throw new Error('');
    });
    expect(sut.execute(mockedInput)).rejects.toThrow();
  });
});
