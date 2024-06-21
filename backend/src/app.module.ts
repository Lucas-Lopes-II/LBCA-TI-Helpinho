import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/infra/main/users.module';

import { TestController } from './test.controller';

@Module({
  imports: [UsersModule],
})
export class AppModule {}
