import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { GameService } from '../../../shared/services/game.service';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [
    MatButton,
    MatCardModule,
    MatTableModule,
    MatIcon,
    DatePipe,
    RouterLink,
  ],
  templateUrl: './games.component.html',
})
@UntilDestroy()
export class GamesComponent implements OnInit {

  constructor(private gameService: GameService) {

  }

  ngOnInit() {

  }
}
