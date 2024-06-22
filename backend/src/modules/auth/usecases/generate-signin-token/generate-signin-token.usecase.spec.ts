import { randomUUID } from 'node:crypto';
import { IJsonWebToken } from '@shared/infra/jwt';
import { GenerateSigninToken } from '@auth/usecases';

describe('GenerateSigninToken.UseCase unit tests', () => {
  const mockedInput: GenerateSigninToken.Input = {
    id: randomUUID(),
    email: 'test@example.com',
    password: 'Test@123',
  };
  const mockedOutput: GenerateSigninToken.Output = {
    access_token: 'generated token',
  };

  let sut: GenerateSigninToken.UseCase;
  let mockedJsonWebToken: IJsonWebToken;

  beforeEach(() => {
    mockedJsonWebToken = {
      sign: jest.fn().mockReturnValue('generated token'),
    } as any as IJsonWebToken;
    sut = new GenerateSigninToken.UseCase(mockedJsonWebToken);
  });

  it('should generate sign-in token correctly', async () => {
    const payload = {
      sub: mockedInput['id'],
      name: mockedInput['name'],
      email: mockedInput['email'],
    };
    const result = await sut.execute(mockedInput);

    expect(result).toStrictEqual(mockedOutput);
    expect(mockedJsonWebToken.sign).toHaveBeenCalledTimes(1);
    expect(mockedJsonWebToken.sign).toHaveBeenCalledWith(payload, {
      expiresIn: '1d',
    });
  });

  it('should throw if mockedJsonWebToken.sign throws', async () => {
    jest.spyOn(mockedJsonWebToken, 'sign').mockImplementationOnce(() => {
      throw new Error('');
    });

    expect(sut.execute(mockedInput)).rejects.toThrow();
  });
});
