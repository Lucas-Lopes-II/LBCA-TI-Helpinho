import { Controller, Get } from '@nestjs/common';
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from '@shared/domain/errors';

@Controller('')
export class TestController {
  @Get('')
  hellho() {
    return 'hello';
  }

  @Get('404')
  notFund() {
    throw new NotFoundError('Não encontrado');
  }

  @Get('400')
  badRequest() {
    throw new BadRequestError('Bad request');
  }

  @Get('500')
  serverError() {
    throw new InternalServerError('Server error');
  }
}
