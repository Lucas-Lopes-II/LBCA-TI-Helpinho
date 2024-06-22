import { UnauthorizedError } from '@shared/domain/errors';
import { IJsonWebToken } from '../jwt.interface';
import jwt, {
  JwtPayload,
  SignOptions,
  DecodeOptions,
  VerifyOptions,
} from 'jsonwebtoken';

export class JsonWebTokenAdapter
  implements
    IJsonWebToken<SignOptions, DecodeOptions, JwtPayload, VerifyOptions>
{
  constructor(private readonly secretKey: string) {}

  public sign(
    payload: string | Buffer | object,
    options?: SignOptions,
  ): string {
    return jwt.sign(payload, this.secretKey, options);
  }

  public decode(token: string, options?: DecodeOptions): null | JwtPayload {
    return jwt.decode(token, options) as JwtPayload;
  }

  public verify<T extends object = any>(
    token: string,
    options?: VerifyOptions,
  ): T {
    try {
      return jwt.verify(token, this.secretKey, options) as T;
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new UnauthorizedError('Token JWT expired');
      }

      throw new UnauthorizedError('Action not allowed');
    }
  }
}
