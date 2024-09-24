import { Component, computed, OnInit, Signal } from '@angular/core';
import { IsSelectedPipe } from '../../shared/pipes/is-selected.pipe';
import { MatCard } from '@angular/material/card';
import { MatGridList, MatGridTile, MatGridTileFooterCssMatStyler, MatGridTileText } from '@angular/material/grid-list';
import { Player } from '../../shared/models/player.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { PlayerService } from '../../shared/services/player.service';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { FromStoragePipe } from '../../shared/pipes/from-storage.pipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    IsSelectedPipe,
    MatCard,
    MatGridList,
    MatGridTile,
    MatGridTileFooterCssMatStyler,
    MatGridTileText,
    NgOptimizedImage,
    FromStoragePipe,
    AsyncPipe,
  ],
  standalone: true,
})
export class HomeComponent implements OnInit {

  allPlayers: Signal<Player[]>;
  sortedPlayers: Signal<Player[]>;

  constructor(private playerService: PlayerService) {
    this.allPlayers = toSignal(this.playerService.getPlayers(), { initialValue: [] });
    this.sortedPlayers = computed(() => {
      return this.allPlayers().sort((a, b) => a.firstname.localeCompare(b.firstname, 'fr', { ignorePunctuation: true }));
    });
  }

  ngOnInit() {
  }

  showInfos(player: Player) {
    // todo
  }
}
