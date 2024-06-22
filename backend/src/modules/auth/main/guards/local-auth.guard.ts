import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { Observable } from 'rxjs';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  public canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  public handleRequest<TUser = any>(err: any, user: any): TUser {
    if (err || !user) {
      throw new HttpException(
        'E-mail and/or Password is wrong',
        HttpStatus.BAD_REQUEST,
      );
    }

    return user;
  }
}
