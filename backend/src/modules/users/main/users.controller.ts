import { Body, Controller, Post } from '@nestjs/common';

import { UsersUseCasesFactory } from '@users/usecases';
import { CreateUser } from './dtos';

@Controller('users')
export class UsersController {
  @Post()
  create(@Body() data: CreateUser) {
    const usecase = UsersUseCasesFactory.createUser();

    return usecase.execute({
      name: data.name,
      email: data.email,
      fone: data.fone,
      password: data.password,
    });
  }
}
