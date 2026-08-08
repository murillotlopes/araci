import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('../../projects/admin/admin.routes').then(({ ADMIN_ROUTES }) => ADMIN_ROUTES),
  },
  {
    path: '',
    loadChildren: () => import('../../projects/web/web.routes').then(({ WEB_ROUTES }) => WEB_ROUTES),
  },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];
