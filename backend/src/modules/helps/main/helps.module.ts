import { Module } from '@nestjs/common';
import { HelpsController } from './helps.controller';

@Module({
  controllers: [HelpsController],
})
export class HelpsModule {}
