import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards';
import { IsPublic } from '@shared/infra/decorators';
import { AuthRequest } from './dtos';
import { AuthUseCasesFactory } from '@auth/usecases';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @IsPublic()
  @Post('login')
  public async login(@Req() req: AuthRequest) {
    const usecase = AuthUseCasesFactory.generateSigninToken();

    return usecase.execute(req.user);
  }
}
