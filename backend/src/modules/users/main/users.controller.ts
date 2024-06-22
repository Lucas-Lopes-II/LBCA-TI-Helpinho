import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';

import { AuthRequest } from '@auth/main/dtos';
import { UsersUseCasesFactory } from '@users/usecases';
import { ChangePasswordDTO, CreateUser } from '@users/main/dtos';
import { CurrentUser, IsPublic } from '@shared/infra/decorators';

@Controller('users')
export class UsersController {
  @HttpCode(HttpStatus.CREATED)
  @IsPublic()
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

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  find(@Param('id') id: string) {
    const usecase = UsersUseCasesFactory.findUserById();

    return usecase.execute({
      userId: id,
    });
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':userId')
  delete(
    @Param('userId') id: string,
    @CurrentUser() { id: actionDoneBy }: AuthRequest,
  ) {
    const usecase = UsersUseCasesFactory.deleteUser();

    return usecase.execute({
      userId: id,
      actionDoneBy: actionDoneBy,
    });
  }

  @HttpCode(HttpStatus.OK)
  @Post(':userId')
  changePassword(
    @Body() data: ChangePasswordDTO,
    @CurrentUser() { id: actionDoneBy }: AuthRequest,
  ) {
    const usecase = UsersUseCasesFactory.changePassword();

    return usecase.execute({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
      actionDoneBy: actionDoneBy,
    });
  }
}
