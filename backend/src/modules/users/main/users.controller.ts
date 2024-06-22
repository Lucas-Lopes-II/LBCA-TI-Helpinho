import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';

import { CreateUser } from './dtos';
import { UsersUseCasesFactory } from '@users/usecases';

@Controller('users')
export class UsersController {
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() data: CreateUser) {
    const usecase = UsersUseCasesFactory.createUser();

    return usecase.execute({
      name: data.name,
      email: data.email,
      fone: data.fone,
      password: data.password,
    });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  find(@Param('id') id: string) {
    const usecase = UsersUseCasesFactory.findUserById();

    return usecase.execute({
      userId: id,
    });
  }
}
