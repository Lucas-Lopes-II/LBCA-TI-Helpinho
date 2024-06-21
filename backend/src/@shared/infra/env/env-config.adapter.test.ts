import { EnvConfigFactory } from '@shared/infra/env';
import { IEnvConfig } from '@shared/domain/env';

describe('EnvConfig integration tests', () => {
  let sut: IEnvConfig;

  beforeEach(() => {
    sut = EnvConfigFactory.create();
  });

  it('sut should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should return the enviroment PORT', async () => {
    const result = sut.getAppPort();

    expect(result).toStrictEqual(3001);
  });

  it('should return the enviroment USERS_TABLE_NAME', async () => {
    const result = sut.getUsersTableName();

    expect(result).toStrictEqual('Users');
  });
});
