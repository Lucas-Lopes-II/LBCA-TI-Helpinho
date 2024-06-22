import { AuthUseCasesFactory } from '@auth/usecases';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({ usernameField: 'email' });
  }

  public async validate(email: string, password: string) {
    const signinUseCase = AuthUseCasesFactory.signin();

    return await signinUseCase.execute({ email, password });
  }
}
