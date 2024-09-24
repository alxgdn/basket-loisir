import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatList, MatListItem, MatNavList } from '@angular/material/list';
import { MatTooltip } from '@angular/material/tooltip';
import { MatLine } from '@angular/material/core';

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
export class AppComponent {
  title: string = 'Basket loisir JSA';
  sidenavOpened: boolean = true;

  constructor() {
  }
}
