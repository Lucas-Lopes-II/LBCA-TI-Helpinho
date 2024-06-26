import { Routes } from '@angular/router';
import { NoAuthGuard, AuthGuard } from './core/auth';

export const routes: Routes = [
  {
    path: 'register',
    canActivate: [NoAuthGuard],
    loadComponent: () =>
      import('./pages/create-account/create-account.component').then(
        (e) => e.CreateAccountComponent
      ),
  },
  {
    path: 'login',
    canActivate: [NoAuthGuard],
    loadComponent: () =>
      import('./pages/login/login.component').then((e) => e.LoginComponent),
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/home').then((e) => e.HomeComponent),
  },
  {
    path: 'helps/:helpId',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./pages/help-details/help-details.component').then(
        (e) => e.HelpDetailsComponent
      ),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'login',
  },
];
