import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { PlayerService } from '../../../shared/services/player.service';
import { UntilDestroy } from '@ngneat/until-destroy';
import { GameService } from '../../../shared/services/game.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    MatButton,
    MatCardModule,
    MatTableModule,
    MatIcon,
    DatePipe,
  ],
  templateUrl: './create-game.component.html',
  styleUrl: './create-game.component.scss',
})
@UntilDestroy()
export class CreateGameComponent implements OnInit {

  constructor(private sessionService: GameService, private playerService: PlayerService) {

  }

  ngOnInit() {
  }
}
