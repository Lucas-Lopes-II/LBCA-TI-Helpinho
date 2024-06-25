import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { globalExeptionFiltersFactory } from '@shared/infra/exception-filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  globalExeptionFiltersFactory(app);

  await app.listen(3000);
}
bootstrap();
