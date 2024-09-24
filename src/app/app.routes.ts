import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { IsAdminGuard } from './shared/guards/is-admin.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    canActivate: [],
  },
  {
    path: 'session',
    loadChildren: () => import('./session/session.module').then((m) => m.SessionModule),
    canActivate: [],
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
    canActivate: [IsAdminGuard],
  },
];
