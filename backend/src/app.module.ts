import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { UsersModule } from '@users/main/users.module';
import { HelpsModule } from '@helps/main/helps.module';
import { AuthModule } from './modules/auth/main/auth.module';
import { JwtAuthGuard } from '@auth/main/guards';

@Module({
  imports: [UsersModule, HelpsModule, AuthModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
