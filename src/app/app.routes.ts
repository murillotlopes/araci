import { Routes } from '@angular/router';
import { LayoutPrivate } from './components/layouts/private/layout-private.component';
import { LayoutPublic } from './components/layouts/public/layout';
import { Dashboard } from './pages/private/dashboard/dashboard';
import { Home } from './pages/public/home/home';
import { Login } from './pages/public/login/login';
import { Register } from './pages/public/register/register';

export const routes: Routes = [
  // Rotas públicas *** Sem Autenticação ***
  {
    path: '',
    component: LayoutPublic,
    children: [
      { path: '', component: Home },
      { path: 'login', component: Login },
      { path: 'register', component: Register }
    ]
  },
  // Rotas privadas *** Com Autenticação ***
  {
    path: '',
    component: LayoutPrivate,
    children: [
      { path: 'dashboard', component: Dashboard }
    ]
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];
