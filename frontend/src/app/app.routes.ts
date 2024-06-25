import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/create-account/create-account.component').then(
        (e) => e.CreateAccountComponent
      ),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'register',
  },
];
