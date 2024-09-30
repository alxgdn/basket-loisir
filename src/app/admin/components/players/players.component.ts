import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCard } from '@angular/material/card';
import { Player } from '../../../shared/models/player.model';
import { MatIcon } from '@angular/material/icon';
import { PlayerService } from '../../../shared/services/player.service';
import { DisplayPostPipe } from '../../../shared/pipes/display-post.pipe';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { StarRateComponent } from '../../../shared/components/star-rate/star-rate.component';
import { MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [
    MatButton,
    MatTableModule,
    MatCard,
    MatIcon,
    DisplayPostPipe,
    StarRateComponent,
    MatSortModule,
  ],
  templateUrl: './players.component.html',
})
@UntilDestroy()
export class PlayersComponent implements OnInit {
  displayedColumns = ['firstname', 'lastname', 'gender', 'post', 'level', 'actions'];
  dataSource: MatTableDataSource<Player>;

  constructor(private router: Router, private playerService: PlayerService) {
    this.dataSource = new MatTableDataSource<Player>();
  }

  ngOnInit() {
    this.playerService.getPlayers().pipe(untilDestroyed(this)).subscribe((players) => {
      this.dataSource.data = players.sort((a, b) => {
        return a.firstname.localeCompare(b.firstname, 'fr', { ignorePunctuation: true });
      });
    });
  }

  addPlayer() {
    this.router.navigateByUrl('/admin/players/add').then();
  }

  edit(uuid: string) {
    this.router.navigateByUrl(`/admin/players/edit/${uuid}`).then();
  }
}
