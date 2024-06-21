import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/main/users.module';

@Module({
  imports: [UsersModule],
})
export class AppModule {}
