import { Routes } from '@angular/router';
import { webGuestGuard } from './auth/guards/web-guest.guard';
import { webPrivateGuard } from './auth/guards/web-private.guard';

export const WEB_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./public/layout/web-public-layout').then(({ WebPublicLayout }) => WebPublicLayout),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./public/pages/home/home.page').then(({ HomePage }) => HomePage),
      },
      {
        path: 'login',
        canActivate: [webGuestGuard],
        loadComponent: () =>
          import('./public/pages/login/login.page').then(({ LoginPage }) => LoginPage),
      },
      {
        path: 'register',
        canActivate: [webGuestGuard],
        loadComponent: () =>
          import('./public/pages/register/register.page').then(({ RegisterPage }) => RegisterPage),
      },
    ],
  },
  {
    path: '',
    canActivate: [webPrivateGuard],
    loadComponent: () =>
      import('./private/layout/web-private-layout').then(({ WebPrivateLayout }) => WebPrivateLayout),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./private/pages/dashboard/dashboard.page').then(({ DashboardPage }) => DashboardPage),
      },
      {
        path: 'exemplo',
        loadComponent: () =>
          import('./private/pages/exemplo-forms/exemplo-forms.page').then(
            ({ ExemploFormsPage }) => ExemploFormsPage,
          ),
      },
    ],
  },
];
