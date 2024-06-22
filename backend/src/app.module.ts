import { Module } from '@nestjs/common';
import { UsersModule } from '@users/main/users.module';
import { HelpsModule } from '@helps/main/helps.module';

@Module({
  imports: [UsersModule, HelpsModule],
})
export class AppModule {}
