import { Module } from '@nestjs/common';
import { UsersModule } from '@users/main/users.module';
import { HelpsModule } from '@helps/main/helps.module';
import { AuthModule } from './modules/auth/main/auth.module';

@Module({
  imports: [UsersModule, HelpsModule, AuthModule],
})
export class AppModule {}
