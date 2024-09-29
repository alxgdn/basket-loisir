import { Routes } from '@angular/router';
import { PhotoComponent } from './components/photo/photo.component';
import { IsAdminGuard } from './shared/guards/is-admin.guard';
import { SigninComponent } from './components/signin/signin.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    canActivate: [],
  },
  {
    path: 'photo',
    component: PhotoComponent,
    canActivate: [],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [],
  },
  {
    path: 'signin',
    component: SigninComponent,
    canActivate: [],
  },
  {
    path: 'game',
    loadChildren: () => import('./game/game.module').then((m) => m.GameModule),
    canActivate: [],
  },
  {
    path: 'session',
    loadChildren: () => import('./session/session.module').then((m) => m.SessionModule),
    canActivate: [IsAdminGuard],
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
    canActivate: [IsAdminGuard],
  },
];
