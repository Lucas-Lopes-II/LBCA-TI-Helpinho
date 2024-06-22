import { requestUser } from '@auth/main/dtos';
import { IJsonWebToken } from '@shared/infra/jwt';
import { DefaultUseCase } from '@shared/application/usecases';

export namespace GenerateSigninToken {
  export type UserPayload = {
    sub: string;
    email: string;
    name: string;
    iat?: number;
    exp?: number;
  };

  export type Input = requestUser;

  export type Output = {
    access_token: string;
  };

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private readonly JWTProvider: IJsonWebToken) {}

    public async execute(input: Input): Promise<Output> {
      const payload: UserPayload = {
        sub: input['id'],
        name: input['name'],
        email: input['email'],
      };
      const jwtToken = this.JWTProvider.sign(payload, { expiresIn: '1d' });

      return {
        access_token: jwtToken,
      };
    }
  }
}
