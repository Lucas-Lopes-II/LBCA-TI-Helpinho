import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { CreateHelpDTO, SearchQueryParamsDto } from './dtos';
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
      value: Number(body.value),
      file: file,
      userRelped: actionDoneBy,
    });
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':helpId')
  delete(
    @Param('helpId') helpId: string,
    @CurrentUser() { id: actionDoneBy }: AuthRequest,
  ) {
    const usecase = HelpsUseCasesFactory.deleteHelp();

    return usecase.execute({
      actionDoneBy: actionDoneBy,
      helpId: helpId,
    });
  }

  @HttpCode(HttpStatus.OK)
  @Get(':helpId')
  find(@Param('helpId') helpId: string) {
    const usecase = HelpsUseCasesFactory.findHelpById();

    return usecase.execute({
      helpId: helpId,
    });
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  search(@Query() quryParams: SearchQueryParamsDto) {
    const usecase = HelpsUseCasesFactory.searchHelp();

    return usecase.execute({
      perPage: parseInt(quryParams?.perPage as any),
      page: parseInt(quryParams?.page as any),
    });
  }
}
