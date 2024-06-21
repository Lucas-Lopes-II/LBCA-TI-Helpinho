import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';

import { Response } from 'express';
import { ForbiddenError } from '../../domain/errors';

@Catch(ForbiddenError)
export class ForbiddenErrorFilter implements ExceptionFilter {
  catch(exception: ForbiddenError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.FORBIDDEN).send({
      statusCode: HttpStatus.FORBIDDEN,
      error: 'Forbidden',
      message: exception.message,
    });
  }
}
