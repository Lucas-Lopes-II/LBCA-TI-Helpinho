import { JwtFactory } from '@shared/infra/jwt';
import { UnauthorizedError } from '@shared/domain/errors';
import { JsonWebTokenAdapter } from './jesonwebtoken.adapter';

describe('JsonWebTokenAdapter integration tests', () => {
  const secretKey = 'mySecretKey';
  const sut = JwtFactory.createWithGivenSecretKey(secretKey);

  it('should create and decode a JWT token correctly', () => {
    const payload = { userId: 12345 };
    const token = sut.sign(payload, { expiresIn: '1h' });
    const decodedPayload = sut.decode(token);

    expect(decodedPayload['userId']).toEqual(12345);
    expect(decodedPayload['exp']).toBeDefined();
    expect(decodedPayload['iat']).toBeDefined();
  });

  it('should throw an UnauthorizedError if the JWT token is expired', async () => {
    const payload = { userId: 12345 };

    const token = sut.sign(payload, { expiresIn: '1s' });
    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(() => sut.verify<{ userId: number }>(token)).toThrow(
      new UnauthorizedError('Token JWT expired'),
    );
  });

  it('should throw an UnauthorizedError if the JWT token is not valid', async () => {
    expect(() => sut.verify('invalid token')).toThrow(
      new UnauthorizedError('Action not allowed'),
    );
  });

  it('should not accept JWT token in valid format but with another secret key', async () => {
    const anotherSecretKey = 'anotherSecretKey';
    const another = new JsonWebTokenAdapter(anotherSecretKey);
    const payload = { userId: 12345 };
    const token = another.sign(payload, { expiresIn: '1h' });

    expect(() => sut.verify<{ userId: number }>(token)).toThrow(
      new UnauthorizedError('Action not allowed'),
    );
  });
});
