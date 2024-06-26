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
    path: 'my-helps',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./pages/my-helps').then((e) => e.MyHelpsComponent),
  },
  {
    path: 'helps',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'register',
        loadComponent: () =>
          import('./pages/create-help').then((e) => e.CreateHelpComponent),
      },
      {
        path: 'provided/create',
        loadComponent: () =>
          import('./pages/help-privided-creation').then(
            (e) => e.HepPrividedCreationComponent
          ),
      },
      {
        path: ':helpId',
        loadComponent: () =>
          import('./pages/help-details/help-details.component').then(
            (e) => e.HelpDetailsComponent
          ),
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: ':helpId',
      },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'login',
  },
];
