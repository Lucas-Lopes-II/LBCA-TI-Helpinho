import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { CreateHelpDTO } from './dtos';
import { AuthRequest } from '@auth/main/dtos';
import { FileDTO } from '@shared/infra/storage/dtos';
import { CurrentUser } from '@shared/infra/decorators';
import { HelpsUseCasesFactory } from '@helps/usecases';

@Controller('helps')
export class HelpsController {
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async create(
    @Body() body: CreateHelpDTO,
    @UploadedFile() file: FileDTO,
    @CurrentUser() { id: actionDoneBy }: AuthRequest,
  ) {
    const usecase = HelpsUseCasesFactory.createHelp();

    return usecase.execute({
      title: body.title,
      description: body.description,
      category: body.category,
      deadline: body.deadline,
      pixKey: body.pixKey,
      value: body.value,
      file: file,
      userRelped: actionDoneBy,
    });
  }
}
