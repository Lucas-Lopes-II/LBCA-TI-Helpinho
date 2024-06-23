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

  it('should return the enviroment USERS_TABLE', async () => {
    const result = sut.getUsersTableName();

    expect(result).toStrictEqual('Users');
  });

  it('should return the enviroment HELPS_TABLE', async () => {
    const result = sut.getHelpsTableName();

    expect(result).toStrictEqual('Helps');
  });

  it('should return the enviroment REGION', async () => {
    const result = sut.getRegion();

    expect(result).toStrictEqual('Region');
  });

  it('should return the enviroment BUCKET_NAME', async () => {
    const result = sut.getBucketName();

    expect(result).toStrictEqual('Bucket Name');
  });

  it('should return the enviroment BUCKET_URL', async () => {
    const result = sut.getBucketUrl();

    expect(result).toStrictEqual('Bucket Url');
  });

  it('should return the enviroment SECRET_TOKEN', async () => {
    const result = sut.getSecretKeyToken();

    expect(result).toStrictEqual('test secret key');
  });
});
