import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';

import { Response } from 'express';
import { InvalidPasswordError } from '../../domain/errors';

@Catch(InvalidPasswordError)
export class InvalidPasswordErrorFilter implements ExceptionFilter {
  catch(exception: InvalidPasswordError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.FORBIDDEN).send({
      statusCode: HttpStatus.FORBIDDEN,
      error: 'Forbidden',
      message: exception.message,
    });
  }
}
