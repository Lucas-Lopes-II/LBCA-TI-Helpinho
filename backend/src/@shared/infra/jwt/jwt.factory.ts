import { envConfigFactory } from '@shared/infra/env';
import { IJsonWebToken } from './jwt.interface';
import { JsonWebTokenAdapter } from './jesonwebtoken/jesonwebtoken.adapter';

export class JwtFactory {
  public static create(): IJsonWebToken {
    const envConfig = envConfigFactory();
    const secretKey = envConfig.getSecretKeyToken();

    return new JsonWebTokenAdapter(secretKey);
  }

  public static createWithGivenSecretKey(secretKey: string): IJsonWebToken {
    return new JsonWebTokenAdapter(secretKey);
  }
}
