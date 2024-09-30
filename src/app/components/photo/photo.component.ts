import { Component, computed, OnInit, Signal } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatGridList, MatGridTile, MatGridTileFooterCssMatStyler, MatGridTileText } from '@angular/material/grid-list';
import { Player } from '../../shared/models/player.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { PlayerService } from '../../shared/services/player.service';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { FromStoragePipe } from '../../shared/pipes/from-storage.pipe';
import { TruncatePipe } from '../../shared/pipes/truncate.pipe';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrl: './photo.component.scss',
  imports: [
    MatCard,
    MatGridList,
    MatGridTile,
    MatGridTileFooterCssMatStyler,
    MatGridTileText,
    NgOptimizedImage,
    FromStoragePipe,
    AsyncPipe,
    TruncatePipe,
  ],
  standalone: true,
})
export class PhotoComponent implements OnInit {
  breakpoint: number = 6;
  height: number = 150;
  allPlayers: Signal<Player[]>;
  sortedPlayers: Signal<Player[]>;

  constructor(private playerService: PlayerService) {
    this.allPlayers = toSignal(this.playerService.getPlayers(), { initialValue: [] });
    this.sortedPlayers = computed(() => {
      return this.allPlayers().sort((a, b) => {
        return a.firstname.localeCompare(b.firstname, 'fr', { ignorePunctuation: true });
      });
    });
  }

  ngOnInit() {
    if (window.innerWidth <= 720) {
      this.breakpoint = 3;
      this.height = 120;
    }
  }

  onResize($event: any) {
    this.breakpoint = ($event.target.innerWidth <= 720) ? 3 : 6;
    this.height = ($event.target.innerWidth <= 720) ? 120 : 150;
  }

  showInfos(player: Player) {
    // todo
  }
}
