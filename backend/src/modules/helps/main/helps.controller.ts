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

import {
  CreateHelpDTO,
  CreateHelpProvidedDTO,
  SearchQueryParamsDTO,
} from './dtos';
import {
  HelpsFields,
  HelpsIndexes,
  HelpsProvidedFields,
  HelpsProvidedIndexes,
} from '@helps/data';
import { AuthRequest } from '@auth/main/dtos';
import { FileDTO } from '@shared/infra/storage/dtos';
import { CurrentUser } from '@shared/infra/decorators';
import { HelpsUseCasesFactory } from '@helps/usecases';
import { NotFoundError } from '@shared/domain/errors';

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

    console.log('body', body);
    console.log('file', file);

    return usecase.execute({
      title: body.title,
      description: body.description,
      category: body.category,
      deadline: body.deadline,
      pixKey: body.pixKey,
      value: Number(body.value),
      file: file,
      userHelped: actionDoneBy,
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
  search(@Query() quryParams: SearchQueryParamsDTO) {
    const usecase = HelpsUseCasesFactory.searchHelp();

    return usecase.execute({
      perPage: parseInt(quryParams?.perPage as any),
      page: parseInt(quryParams?.page as any),
    });
  }

  @HttpCode(HttpStatus.OK)
  @Get('by-user-helped/:userHelpedId')
  public findHelpByUserHelpedId(
    @Query() quryParams: SearchQueryParamsDTO,
    @Param('userHelpedId') userHelpedId: string,
  ) {
    const usecase = HelpsUseCasesFactory.searchHelpsByFilter();

    return usecase.execute({
      perPage: parseInt(quryParams?.perPage as any),
      page: parseInt(quryParams?.page as any),
      field: HelpsFields.USER_HELPED_ID,
      index: HelpsIndexes.USER_HELPED_ID,
      value: userHelpedId,
    });
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('provided')
  public async createHelpProvided(
    @Body() body: CreateHelpProvidedDTO,
    @CurrentUser() { id: actionDoneBy }: AuthRequest,
  ) {
    const usecase = HelpsUseCasesFactory.createHelpProvided();

    return usecase.execute({
      executionDate: body.executionDate,
      value: Number(body.value),
      helpId: body.helpId,
      userHelped: body.userHelped,
      actionDoneBy: actionDoneBy,
    });
  }

  @HttpCode(HttpStatus.OK)
  @Get('provided/:helpProvidedId')
  public async findHelpProvided(
    @Param('helpProvidedId') helpProvidedId: string,
  ) {
    const usecase = HelpsUseCasesFactory.searchHelpsProvidedByFilter();
    const result = await usecase.execute({
      page: 1,
      perPage: 1,
      field: HelpsProvidedFields.ID,
      index: HelpsProvidedIndexes.ID,
      value: helpProvidedId,
    });

    if (result.items[0]) {
      return result.items[0];
    } else {
      throw new NotFoundError('Registor não encontrado');
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('provided/by-help/:helpId')
  public findHelpProvidedByHelpId(
    @Query() quryParams: SearchQueryParamsDTO,
    @Param('helpId') helpId: string,
  ) {
    const usecase = HelpsUseCasesFactory.searchHelpsProvidedByFilter();

    return usecase.execute({
      perPage: parseInt(quryParams?.perPage as any),
      page: parseInt(quryParams?.page as any),
      field: HelpsProvidedFields.HELP_ID,
      index: HelpsProvidedIndexes.HELP_ID,
      value: helpId,
    });
  }

  @HttpCode(HttpStatus.OK)
  @Get('provided/by-user-helped/:userHelpedId')
  public findHelpProvidedByUserHelpedId(
    @Query() quryParams: SearchQueryParamsDTO,
    @Param('userHelpedId') userHelpedId: string,
  ) {
    const usecase = HelpsUseCasesFactory.searchHelpsProvidedByFilter();

    return usecase.execute({
      perPage: parseInt(quryParams?.perPage as any),
      page: parseInt(quryParams?.page as any),
      field: HelpsProvidedFields.USER_HELPED_ID,
      index: HelpsProvidedIndexes.USER_HELPED_ID,
      value: userHelpedId,
    });
  }
}
