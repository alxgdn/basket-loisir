import { Component, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatTooltip } from '@angular/material/tooltip';
import { MatLine } from '@angular/material/core';
import { UserService } from './shared/services/user.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { User } from './shared/models/user.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    RouterLinkActive,
    MatTooltip,
    RouterLink,
    MatLine,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
@UntilDestroy()
export class AppComponent {
  title: string = 'Basket loisir JSA';
  sidenavOpened: boolean = true;
  user: Signal<User>;

  constructor(private userService: UserService, private router: Router) {
    this.user = toSignal(
      this.userService.hasUserChanged().pipe(
        untilDestroyed(this),
        map(() => this.userService.getUserConnected()),
      ));
  }

  login() {
    this.router.navigateByUrl('/login').then();
  }

  logout() {
    this.userService.logout();
  }
}
