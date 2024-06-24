import { Help } from '../../entities/help';
import { randomUUID } from 'node:crypto';
import { HelpCategory } from '@helps/data';
import { HelpsRepository } from './helps.repository';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { InternalServerError } from '@shared/domain/errors';
import { IHelpsRepository } from './Helps.repository.interface';

describe('HelpsRepository unit tests', () => {
  let sut: IHelpsRepository;
  const data: Help = {
    id: randomUUID(),
    category: HelpCategory.HEALTH,
    title: 'title',
    description: 'description',
    pixKey: '4547897467899',
    userRelped: randomUUID(),
    deadline: new Date().toISOString(),
    value: 500.0,
    helpValue: 30.0,
    userName: 'name',
    imgUrl: '',
  };
  const returnedHelp = {
    Items: [
      {
        id: { S: data.id },
        title: { S: data.title },
        description: { S: data.description },
        userRelped: { S: data.userRelped },
        userName: { S: data.userName },
        value: { S: String(data.value) },
        helpValue: { S: String(data.helpValue) },
        pixKey: { S: data.pixKey },
        deadline: { S: data.deadline },
        category: { S: data.category },
        imgUrl: { S: data.imgUrl },
      },
    ],
  } as never;
  let mockedClientDB: DynamoDBClient;

  beforeAll(async () => {
    try {
      mockedClientDB = {
        send: jest.fn().mockResolvedValue(returnedHelp),
      } as any as DynamoDBClient;
      sut = HelpsRepository.createInstance(mockedClientDB);
    } catch (error) {
      console.log(error);
    }
  });

  it(`the sut should be defined`, () => {
    expect(sut).toBeDefined();
  });

  describe('create', () => {
    it('should create an Help', async () => {
      await sut.create(data);

      expect(mockedClientDB.send).toHaveBeenCalled();
    });

    it('should throw if mockedClientDB.send throws error with message', async () => {
      jest.spyOn(mockedClientDB, 'send').mockImplementationOnce(() => {
        throw new Error('teste de erro');
      });

      await expect(sut.create(data)).rejects.toThrow(
        new InternalServerError('teste de erro'),
      );
    });

    it('should throw if mockedClientDB.send throws error without message', async () => {
      jest.spyOn(mockedClientDB, 'send').mockImplementationOnce(() => {
        throw new Error('');
      });

      await expect(sut.create(data)).rejects.toThrow(
        new InternalServerError('Ocorreu um erro ao criar help'),
      );
    });
  });

  describe('findById', () => {
    it('should find an Help by id', async () => {
      const result = await sut.findById(data.id);

      expect(result).toStrictEqual(data);
      expect(mockedClientDB.send).toHaveBeenCalled();
    });

    it('should return undefined', async () => {
      jest
        .spyOn(mockedClientDB, 'send')
        .mockResolvedValueOnce(undefined as never);
      const result = await sut.findById(data.id);

      expect(result).toStrictEqual(undefined);
      expect(mockedClientDB.send).toHaveBeenCalled();
    });

    it('should throw if mockedClientDB.send throws error with message', async () => {
      jest.spyOn(mockedClientDB, 'send').mockImplementationOnce(() => {
        throw new Error('teste de erro');
      });

      await expect(sut.findById(data.id)).rejects.toThrow(
        new InternalServerError('teste de erro'),
      );
    });

    it('should throw if mockedClientDB.send throws error without message', async () => {
      jest.spyOn(mockedClientDB, 'send').mockImplementationOnce(() => {
        throw new Error('');
      });

      await expect(sut.findById(data.id)).rejects.toThrow(
        new InternalServerError('Ocorreu um erro ao buscar help por id'),
      );
    });
  });

  describe('delete', () => {
    it('should delete an Help by id', async () => {
      await sut.delete(data.id);

      expect(mockedClientDB.send).toHaveBeenCalled();
    });

    it('should throw if mockedClientDB.send throws error with message', async () => {
      jest.spyOn(mockedClientDB, 'send').mockImplementationOnce(() => {
        throw new Error('teste de erro');
      });

      await expect(sut.delete(data.id)).rejects.toThrow(
        new InternalServerError('teste de erro'),
      );
    });

    it('should throw if mockedClientDB.send throws error without message', async () => {
      jest.spyOn(mockedClientDB, 'send').mockImplementationOnce(() => {
        throw new Error('');
      });

      await expect(sut.delete(data.id)).rejects.toThrow(
        new InternalServerError('Ocorreu um erro ao deletar help'),
      );
    });
  });

  describe('update', () => {
    it('should update an Help', async () => {
      await sut.update(data.id, { ...data });

      expect(mockedClientDB.send).toHaveBeenCalled();
    });

    it('should throw if mockedClientDB.send throws error with message', async () => {
      jest.spyOn(mockedClientDB, 'send').mockImplementationOnce(() => {
        throw new Error('teste de erro');
      });

      await expect(sut.update(data.id, { ...data })).rejects.toThrow(
        new InternalServerError('teste de erro'),
      );
    });

    it('should throw if mockedClientDB.send throws error without message', async () => {
      jest.spyOn(mockedClientDB, 'send').mockImplementationOnce(() => {
        throw new Error('');
      });

      await expect(sut.update(data.id, { ...data })).rejects.toThrow(
        new InternalServerError('Ocorreu um erro ao atualizar help'),
      );
    });
  });
});
