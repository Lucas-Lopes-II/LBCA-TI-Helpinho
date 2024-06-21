import { User } from './user';
import { UsersRepository } from './users.repository';
import { randomUUID } from 'crypto';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { IUsersRepository } from './users.repository.interface';
import { InternalServerError } from '@shared/domain/errors';

describe('UsersRepository unit tests', () => {
  let sut: IUsersRepository;
  const data: User = {
    id: randomUUID(),
    name: 'Name',
    email: 'email@example.com',
    fone: '85996321456',
    password: 'Test@123',
  };
  let mockedClientDB: DynamoDBClient;

  beforeAll(async () => {
    try {
      mockedClientDB = {
        send: jest.fn().mockResolvedValue({
          Items: [
            {
              id: { S: data.id },
              name: { S: data.name },
              email: { S: data.email },
              fone: { S: data.fone },
              password: { S: data.password },
            },
          ],
        } as never),
      } as any as DynamoDBClient;
      sut = UsersRepository.createInstance(mockedClientDB);
    } catch (error) {
      console.log(error);
    }
  });

  it(`the sut should be defined`, () => {
    expect(sut).toBeDefined();
  });

  describe('create', () => {
    it('should create an user', async () => {
      await sut.create(data);

      expect(mockedClientDB.send).toHaveBeenCalled();
    });

    it('should throw if mockedClientDB.send throws error with message', async () => {
      jest.spyOn(mockedClientDB, 'send').mockImplementationOnce(() => {
        throw new Error('teste de erro');
      });

      expect(sut.create(data)).rejects.toThrow(
        new InternalServerError('teste de erro'),
      );
    });

    it('should throw if mockedClientDB.send throws error without message', async () => {
      jest.spyOn(mockedClientDB, 'send').mockImplementationOnce(() => {
        throw new Error('');
      });

      expect(sut.create(data)).rejects.toThrow(
        new InternalServerError('Ocorreu um erro ao criar usuário'),
      );
    });
  });

  describe('findByEmail', () => {
    it('should find by email an user', async () => {
      const result = await sut.findByEmail(data.email);

      expect(result).toStrictEqual(data);
      expect(mockedClientDB.send).toHaveBeenCalled();
    });

    it('should throw if mockedClientDB.send throws error with message', async () => {
      jest.spyOn(mockedClientDB, 'send').mockImplementationOnce(() => {
        throw new Error('teste de erro');
      });

      expect(sut.findByEmail(data.email)).rejects.toThrow(
        new InternalServerError('teste de erro'),
      );
    });

    it('should throw if mockedClientDB.send throws error without message', async () => {
      jest.spyOn(mockedClientDB, 'send').mockImplementationOnce(() => {
        throw new Error('');
      });

      expect(sut.findByEmail(data.email)).rejects.toThrow(
        new InternalServerError('Ocorreu um erro ao buscar usuário por email'),
      );
    });
  });
});
