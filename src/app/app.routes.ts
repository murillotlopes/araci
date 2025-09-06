import { Routes } from '@angular/router';
import { LayoutPrivate } from './pages/private/layout-private/layout-private';
import { Home } from './pages/public/home/home';
import { LayoutPublic } from './pages/public/layout/layout';

export const routes: Routes = [
  // Rotas públicas *** Sem Autenticação ***
  {
    path: '',
    component: LayoutPublic,
    children: [
      { path: '', component: Home }
    ]
  },
  // Rotas privadas *** Com Autenticação ***
  {
    path: '',
    component: LayoutPrivate
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];
