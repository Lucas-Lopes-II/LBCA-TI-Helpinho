import { INestApplication } from '@nestjs/common';

import {
  BadRequestErrorFilter,
  ConflictErrorFilter,
  ForbiddenErrorFilter,
  InternalServerErrorFilter,
  InvalidCredentialsErrorFilter,
  InvalidPasswordErrorFilter,
  NotFoundErrorFilter,
  UnprocessableEntityErrorFilter,
  UnauthorizedErrorFilter,
} from '@shared/infra/exception-filters';

export const globalExeptionFiltersFactory = (app: INestApplication): void => {
  app.useGlobalFilters(
    new ConflictErrorFilter(),
    new NotFoundErrorFilter(),
    new BadRequestErrorFilter(),
    new InvalidPasswordErrorFilter(),
    new InvalidCredentialsErrorFilter(),
    new UnprocessableEntityErrorFilter(),
    new InternalServerErrorFilter(),
    new InternalServerErrorFilter(),
    new ForbiddenErrorFilter(),
    new UnauthorizedErrorFilter(),
  );
};
