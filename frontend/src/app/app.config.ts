import { provideRouter } from '@angular/router';
import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';
import { provideAuth } from './core/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideAuth(),
    {
      provide: LOCALE_ID,
      useValue: 'pt-br'
    }
  ],
};
