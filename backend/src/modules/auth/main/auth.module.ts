import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { LocalStrategy, JwtStrategy } from './strategies';

@Module({
  controllers: [AuthController],
  providers: [LocalStrategy, JwtStrategy],
})
export class AuthModule {}
