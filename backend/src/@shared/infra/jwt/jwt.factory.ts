import { IJsonWebToken } from './jwt.interface';
import { JsonWebTokenAdapter } from './jesonwebtoken/jesonwebtoken.adapter';
import { EnvConfigFactory } from '../env';

export class JwtFactory {
  private static readonly envConfig = EnvConfigFactory.create();

  public static create(): IJsonWebToken {
    return new JsonWebTokenAdapter(this.envConfig.getSecretKeyToken());
  }

  public static createWithGivenSecretKey(secretKey: string): IJsonWebToken {
    return new JsonWebTokenAdapter(secretKey);
  }
}
