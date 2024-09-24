import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SessionsComponent } from './components/sessions/sessions.component';
import { CreateSessionComponent } from './components/create-session/create-session.component';

const routes: Routes = [
  {
    path: '',
    component: SessionsComponent,
    pathMatch: 'full',
  },
  {
    path: 'create/:uuid',
    component: CreateSessionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SessionRoutingModule {
}
