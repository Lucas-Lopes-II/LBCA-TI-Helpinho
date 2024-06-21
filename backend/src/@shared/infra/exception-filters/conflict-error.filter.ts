import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';

import { Response } from 'express';
import { ConflictError } from '../../domain/errors';

@Catch(ConflictError)
export class ConflictErrorFilter implements ExceptionFilter {
  catch(exception: ConflictError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.CONFLICT).send({
      statusCode: HttpStatus.CONFLICT,
      error: 'Conflict',
      message: exception.message,
    });
  }
}
