import { randomUUID } from 'crypto';
import { CreateHelp } from './create-help.usecase';
import { HelpCategory, IHelpsRepository } from '@helps/data';
import { IUsersRepository, User } from '@users/data';
import { Validation } from '@shared/domain/validations';
import { IStorage } from '@shared/infra/storage';
import { NotFoundError } from '@shared/domain/errors';

describe('CreateHelp.UseCase unit tests', () => {
  const mockedInput: CreateHelp.Input = {
    title: 'title',
    description: 'description',
    pixKey: '4547897467899',
    userHelped: randomUUID(),
    category: HelpCategory.HEALTH,
    deadline: new Date().toISOString(),
    value: 500.0,
    file: {
      buffer: new Buffer(''),
      encoding: 'utf8',
      fieldname: '',
      mimetype: 'application/pdf',
      originalname: '',
      size: 1548,
    },
  };
  const user: User = {
    id: mockedInput.userHelped,
    name: 'Test',
    email: 'email@test.com',
    fone: '558596632147',
    password: 'hashedPassword',
  };

  let sut: CreateHelp.UseCase;
  let mockedRepo: IHelpsRepository;
  let mockedUserRepo: IUsersRepository;
  let mockedValidator: Validation;
  let mockedStorage: IStorage;

  beforeEach(() => {
    mockedRepo = {
      create: jest.fn().mockResolvedValue(null),
    } as any as IHelpsRepository;
    mockedUserRepo = {
      findById: jest.fn().mockResolvedValue(user),
    } as any as IUsersRepository;
    mockedValidator = {
      validate: jest.fn().mockResolvedValue(null),
    } as any as Validation;
    mockedStorage = {
      upload: jest.fn().mockResolvedValue({ fileUrl: 'url' }),
    } as any as IStorage;
    sut = new CreateHelp.UseCase(
      mockedRepo,
      mockedUserRepo,
      mockedValidator,
      mockedStorage,
    );
  });

  it('should create a help', async () => {
    await sut.execute(mockedInput);

    expect(mockedValidator.validate).toHaveBeenCalledTimes(1);
    expect(mockedUserRepo.findById).toHaveBeenCalledTimes(1);
    expect(mockedStorage.upload).toHaveBeenCalledTimes(1);
    expect(mockedRepo.create).toHaveBeenCalledTimes(1);
  });

  it('should throw if validator.validate throws', async () => {
    jest.spyOn(mockedValidator, 'validate').mockImplementationOnce(() => {
      throw new Error('');
    });

    expect(sut.execute(mockedInput)).rejects.toThrow();
  });

  it('should throw a NotFoundError if userRepo.findById return undefined', async () => {
    jest.spyOn(mockedUserRepo, 'findById').mockResolvedValueOnce(undefined);

    expect(sut.execute(mockedInput)).rejects.toThrow(
      new NotFoundError('Usuário criador não encontrado'),
    );
  });

  it('should throw if userRepo.findById throws', async () => {
    jest.spyOn(mockedUserRepo, 'findById').mockImplementationOnce(() => {
      throw new Error('');
    });

    expect(sut.execute(mockedInput)).rejects.toThrow();
  });

  it('should throw if storage.upload throws', async () => {
    jest.spyOn(mockedStorage, 'upload').mockImplementationOnce(() => {
      throw new Error('');
    });
    expect(sut.execute(mockedInput)).rejects.toThrow();
  });

  it('should throw if helpRepo.create throws', async () => {
    jest.spyOn(mockedRepo, 'create').mockImplementationOnce(() => {
      throw new Error('');
    });
    expect(sut.execute(mockedInput)).rejects.toThrow();
  });
});
