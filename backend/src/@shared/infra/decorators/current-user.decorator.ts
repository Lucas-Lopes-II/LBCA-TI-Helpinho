import { AuthRequest } from '@auth/main/dtos';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): Express.User => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    return request.user;
  },
);
