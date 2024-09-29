import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesComponent } from './components/games/games.component';
import { CreateGameComponent } from './components/create-game/create-game.component';
import { IsAdminGuard } from '../shared/guards/is-admin.guard';

const routes: Routes = [
  {
    path: '',
    component: GamesComponent,
    pathMatch: 'full',
  },
  {
    path: 'create/:uuid',
    component: CreateGameComponent,
    canActivate: [IsAdminGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameRoutingModule {
}
