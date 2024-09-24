import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditPlayerComponent } from './components/edit-player/edit-player.component';
import { PlayersComponent } from './components/players/players.component';

const routes: Routes = [
  {
    path: '',
    component: PlayersComponent,
    pathMatch: 'full',
  },
  {
    path: 'players/add',
    component: EditPlayerComponent,
    title: 'Ajouter un joueur',
  },
  {
    path: 'players/edit/:uuid',
    component: EditPlayerComponent,
    title: 'Modifier un joueur',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {
}
