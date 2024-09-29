import { Component, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatList, MatListItem, MatNavList } from '@angular/material/list';
import { MatTooltip } from '@angular/material/tooltip';
import { MatLine } from '@angular/material/core';
import { UserService } from './shared/services/user.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { User } from './shared/models/user.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatIcon,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatIconButton,
    MatSidenavModule,
    MatNavList,
    MatListItem,
    MatButton,
    MatList,
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
  title: string = ':';
  sidenavOpened: boolean = true;
  user: Signal<User>;

  constructor(private userService: UserService, private router: Router) {
    this.user = toSignal(this.userService.getUserConnected().pipe(untilDestroyed(this)));
  }

  login() {
    this.router.navigateByUrl('/login').then();
  }

  logout() {
    this.userService.logout();
  }
}
