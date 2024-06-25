import {
  HelpProvided,
  HelpsProvidedRepository,
  IHelpsProvidedRepository,
} from '@helps/data';
import { randomUUID } from 'node:crypto';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { InternalServerError } from '@shared/domain/errors';

describe('HelpsProvidedRepository unit tests', () => {
  let sut: IHelpsProvidedRepository;
  const data: HelpProvided = {
    id: randomUUID(),
    helpId: randomUUID(),
    userDonor: randomUUID(),
    userHelped: randomUUID(),
    value: 20.0,
    executionDate: new Date().toISOString(),
  };
  const returnedHelp = {
    Items: [
      {
        id: { S: data.id },
        helpId: { S: data.helpId },
        userDonor: { S: data.userDonor },
        userHelped: { S: data.userHelped },
        executionDate: { S: data.executionDate },
        value: { S: String(data.value) },
      },
    ],
  } as never;
  let mockedClientDB: DynamoDBClient;

  beforeAll(async () => {
    try {
      mockedClientDB = {
        send: jest.fn().mockResolvedValue(returnedHelp),
      } as any as DynamoDBClient;
      sut = HelpsProvidedRepository.createInstance(mockedClientDB);
    } catch (error) {
      console.log(error);
    }
  });

  it(`the sut should be defined`, () => {
    expect(sut).toBeDefined();
  });

  describe('create', () => {
    it('should create an Help provided', async () => {
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
        new InternalServerError('Ocorreu um erro ao criar help provided'),
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

  describe('update', () => {
    it('should update an Help provided', async () => {
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
        new InternalServerError('Ocorreu um erro ao atualizar help provided'),
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
        new InternalServerError('Ocorreu um erro ao deletar help provided'),
      );
    });
  });
});
