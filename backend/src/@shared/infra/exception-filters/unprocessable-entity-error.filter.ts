import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';

import { Response } from 'express';
import { UnprocessableEntityError } from '../../domain/errors';

@Catch(UnprocessableEntityError)
export class UnprocessableEntityErrorFilter implements ExceptionFilter {
  catch(exception: UnprocessableEntityError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.UNPROCESSABLE_ENTITY).send({
      statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      error: 'Unprocessable Entity',
      message: exception.message,
    });
  }
}
