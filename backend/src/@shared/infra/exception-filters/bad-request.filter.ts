import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';

import { Response } from 'express';
import { BadRequestError } from '../../domain/errors';

@Catch(BadRequestError)
export class BadRequestErrorFilter implements ExceptionFilter {
  catch(exception: BadRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.BAD_REQUEST).send({
      statusCode: HttpStatus.BAD_REQUEST,
      error: 'Bad Request',
      message: exception.message,
    });
  }
}
