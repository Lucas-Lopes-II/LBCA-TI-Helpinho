import { Body, Controller, Param, Post } from '@nestjs/common';

import { CreateUser } from './dtos';
import { UsersRepositoryFactory } from '@users/data';
import { UsersUseCasesFactory } from '@users/usecases';

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

  @Post(':email')
  fndByEmail(@Param('email') email: string) {
    const repo = UsersRepositoryFactory.create();

    return repo.findByEmail(email);
  }
}
