import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';

import { Response } from 'express';
import { NotFoundError } from '../../domain/errors';

@Catch(NotFoundError)
export class NotFoundErrorFilter implements ExceptionFilter {
  catch(exception: NotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.NOT_FOUND).send({
      statusCode: HttpStatus.NOT_FOUND,
      error: 'Not Found',
      message: exception.message,
    });
  }
}
