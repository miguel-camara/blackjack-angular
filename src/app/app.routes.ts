import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home'),
    title: 'Blackjack',
  },
  {
    path: '**',
    redirectTo: '',
  }
];
