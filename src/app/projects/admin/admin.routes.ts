import { Routes } from '@angular/router';
import { ADMIN_PRIVATE_ROUTES } from './private/admin-private.routes';
import { ADMIN_PUBLIC_ROUTES } from './public/admin-public.routes';

export const ADMIN_ROUTES: Routes = [...ADMIN_PUBLIC_ROUTES, ...ADMIN_PRIVATE_ROUTES];
