import { Routes } from '@angular/router';
import { LayoutPublic } from './components/layouts/public/layout';
import { PrivateGuard } from './guards/private-guard';
import { PublicGuard } from './guards/public-guard-guard';
import { LayoutPrivate } from './layouts/private/layout-private.component';
import { Dashboard } from './pages/private/dashboard/dashboard';
import { Home } from './pages/public/home/home';
import { Login } from './pages/public/login/login';
import { Register } from './pages/public/register/register';

export const routes: Routes = [
  // Rotas públicas *** Sem Autenticação ***
  {
    path: '',
    component: LayoutPublic,
    canActivate: [PublicGuard],
    children: [
      { path: '', component: Home },
      { path: 'login', component: Login },
      { path: 'register', component: Register },
    ]
  },
  // Rotas privadas *** Com Autenticação ***
  {
    path: '',
    component: LayoutPrivate,
    canActivate: [PrivateGuard],
    children: [
      { path: 'dashboard', component: Dashboard }
    ]
  },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];
