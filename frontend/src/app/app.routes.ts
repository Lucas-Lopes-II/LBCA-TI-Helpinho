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
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((e) => e.LoginComponent),
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home').then((e) => e.HomeComponent),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'login',
  },
];
