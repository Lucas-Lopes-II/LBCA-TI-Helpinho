import { BcryptAdapter, IHasher } from '@shared/infra/crypto/hasher';

describe('Bcrypt integration tests', () => {
  let sut: IHasher;
  const dataToHash = 'hash test';

  beforeEach(() => {
    sut = new BcryptAdapter();
  });

  it('should create a hash', async () => {
    expect.assertions(0);
    await sut.hash(dataToHash);
  });

  it('should compare hashes correctly', async () => {
    const hashedData = await sut.hash(dataToHash);

    await expect(sut.compare(dataToHash, hashedData)).resolves.toBeTruthy();
    await expect(sut.compare('wrong data', hashedData)).resolves.toBeFalsy();
  });
});
