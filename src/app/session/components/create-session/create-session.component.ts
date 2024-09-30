import { Component, computed, OnInit, Signal } from '@angular/core';
import { SessionService } from '../../../shared/services/session.service';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { AsyncPipe, DatePipe, JsonPipe, NgClass, NgOptimizedImage } from '@angular/common';
import { PlayerService } from '../../../shared/services/player.service';
import { Gender, Player, Post } from '../../../shared/models/player.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatGridListModule } from '@angular/material/grid-list';
import { Session } from '../../../shared/models/session.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import moment from 'moment';
import { DateUtils } from '../../../shared/helpers/date.utils';
import { map, of, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { IsSelectedPipe } from '../../../shared/pipes/is-selected.pipe';
import { MatExpansionModule } from '@angular/material/expansion';
import { Color, Team } from '../../../shared/models/team.model';
import _ from 'lodash';
import { AverageRatePipe } from '../../../shared/pipes/average-rate.pipe';
import { StarRateComponent } from '../../../shared/components/star-rate/star-rate.component';
import { TeamUtils } from '../../../shared/helpers/team.utils';
import { FromStoragePipe } from '../../../shared/pipes/from-storage.pipe';

@Component({
  selector: 'app-session',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatTableModule,
    MatIcon,
    DatePipe,
    MatGridListModule,
    NgClass,
    IsSelectedPipe,
    MatExpansionModule,
    JsonPipe,
    AverageRatePipe,
    StarRateComponent,
    AsyncPipe,
    FromStoragePipe,
    NgOptimizedImage,
  ],
  templateUrl: './create-session.component.html',
  styleUrl: './create-session.component.scss',
})
@UntilDestroy()
export class CreateSessionComponent implements OnInit {

  allPlayers: Signal<Player[]>;
  sortedPlayers: Signal<Player[]>;
  today: Date;
  currentSession: Session;
  breakpoint: number = 6;
  height: number = 150;

  constructor(private sessionService: SessionService, private playerService: PlayerService, route: ActivatedRoute) {
    this.allPlayers = toSignal(this.playerService.getPlayers(), { initialValue: [] });
    this.sortedPlayers = computed(() => {
      return this.allPlayers().sort((a, b) => a.firstname.localeCompare(b.firstname, 'fr', { ignorePunctuation: true }));
    });
    this.today = new Date();
    route.params.pipe(
      map((params) => {
        return params['uuid'];
      }),
      switchMap((uuid) => this.sessionService.getSession(uuid)),
      switchMap((session) => {
        if (!!session) {
          return of(session);
        } else {
          return this.sessionService.createSession({
            date: moment(this.today).format(DateUtils.frenchDateFormat),
            players: [],
            teams: [],
          });
        }
      }),
    )
      .pipe(untilDestroyed(this))
      .subscribe((session) => {
        this.currentSession = session;
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

  selectPlayer(player: Player) {
    const index = this.currentSession.players.findIndex((p) => p.uuid === player.uuid);
    if (index >= 0) {
      this.currentSession.players.splice(index, 1);
    } else {
      this.currentSession.players.push(player);
    }
    this.saveSession();
  }

  generateTeams() {
    let canGenerate = true;
    if (this.currentSession.teams.some((t) => t.players.length > 0)) {
      canGenerate = confirm('Les équipes ont déjà été générées. Recommencer ?');
    }
    if (canGenerate) {
      this.createTeams();
      this.fillTeams();
      this.mitigate();
      this.saveSession();
    }
  }

  private saveSession() {
    this.sessionService.updateSession(this.currentSession).pipe(untilDestroyed(this)).subscribe(() => {
    });
  }

  private createTeams() {
    const nbPlayers = this.currentSession.players.length;
    let nbTeams = 2;
    if (nbPlayers >= 15) {
      if (nbPlayers < 20) {
        nbTeams = 3;
      } else if (nbPlayers < 30) {
        nbTeams = 4;
      } else {
        nbTeams = 6;
      }
    }
    this.currentSession.teams = [];
    const colors: Color[] = Object.values(Color);
    for (let i = 0; i < nbTeams; i++) {
      this.currentSession.teams.push({
        color: colors[i],
        players: [],
      });
    }
  }

  private fillTeams() {
    // On remplit les équipes d'abord avec les filles
    let indexTeam = this.fillRandomly(this.currentSession.players.filter((p) => p.gender == Gender.FEMALE), 0);
    // Puis les pivots
    indexTeam = this.fillRandomly(this.currentSession.players.filter((p) => p.gender == Gender.MALE && p.post === Post.CENTER.toString()), indexTeam);
    // Puis les ailiers
    indexTeam = this.fillRandomly(this.currentSession.players.filter((p) => p.gender == Gender.MALE && p.post === Post.FORWARD.toString()), indexTeam);
    // Puis les meneurs
    this.fillRandomly(this.currentSession.players.filter((p) => p.gender == Gender.MALE && p.post === Post.GUARD.toString()), indexTeam);
  }

  private fillRandomly(players: Player[], index: number): number {
    _.shuffle(players).forEach((p) => {
      this.currentSession.teams[index].players.push(p);
      index++;
      if (index === this.currentSession.teams.length) {
        index = 0;
      }
    });
    return index;
  }

  private mitigate() {
    const teamsByLevel =
      [...this.currentSession.teams]
        .sort((a, b) => TeamUtils.calculateAverageRate(a.players) - TeamUtils.calculateAverageRate(b.players));

    this.mitigateTeams(teamsByLevel[0], teamsByLevel[teamsByLevel.length - 1]);
    if (teamsByLevel.length > 3) {
      this.mitigateTeams(teamsByLevel[1], teamsByLevel[teamsByLevel.length - 2]);
    }
    if (teamsByLevel.length > 5) {
      this.mitigateTeams(teamsByLevel[2], teamsByLevel[teamsByLevel.length - 3]);
    }
  }

  private mitigateTeams(weakestTeam: Team, strongestTeam: Team) {
    // Si la différence de moyenne des 2 est supérieure à 0.4
    if (TeamUtils.calculateAverageRate(strongestTeam.players) - TeamUtils.calculateAverageRate(weakestTeam.players) > 0.4) {
      // On fait des swaps que sur des garçons
      const allStarPlayersFromWeakestTeam: Player[] = weakestTeam.players.filter((p) => +p.level === 4 && p.gender == Gender.MALE);
      const allStarPlayersFromStrongestTeam: Player[] = strongestTeam.players.filter((p) => +p.level === 4 && p.gender == Gender.MALE);
      const veteranPlayersFromWeakestTeam: Player[] = weakestTeam.players.filter((p) => +p.level === 3 && p.gender == Gender.MALE);
      const veteranPlayersFromStrongestTeam: Player[] = strongestTeam.players.filter((p) => +p.level === 3 && p.gender == Gender.MALE);
      const intermediatePlayersFromWeakestTeam: Player[] = weakestTeam.players.filter((p) => +p.level === 2 && p.gender == Gender.MALE);
      const intermediatePlayersFromStrongestTeam: Player[] = strongestTeam.players.filter((p) => +p.level === 2 && p.gender == Gender.MALE);
      if (allStarPlayersFromWeakestTeam.length < allStarPlayersFromStrongestTeam.length && allStarPlayersFromStrongestTeam.length > 1) {
        this.swapPlayers(
          weakestTeam,
          strongestTeam,
          this.determinateWeakPlayerToSwap(weakestTeam, allStarPlayersFromStrongestTeam[0]),
          allStarPlayersFromStrongestTeam[0],
        );
      } else if (veteranPlayersFromWeakestTeam.length < veteranPlayersFromStrongestTeam.length) {
        this.swapPlayers(
          weakestTeam,
          strongestTeam,
          this.determinateWeakPlayerToSwap(weakestTeam, veteranPlayersFromStrongestTeam[0]),
          veteranPlayersFromStrongestTeam[0],
        );
      } else if (intermediatePlayersFromWeakestTeam.length < intermediatePlayersFromStrongestTeam.length) {
        this.swapPlayers(
          weakestTeam,
          strongestTeam,
          this.determinateWeakPlayerToSwap(weakestTeam, intermediatePlayersFromStrongestTeam[0]),
          intermediatePlayersFromStrongestTeam[0],
        );
      }
    }
  }

  private determinateWeakPlayerToSwap(weakTeam: Team, strongPlayer: Player) {
    let weakPlayer: Player = null;
    const beginnerPlayersSamePost: Player[] = weakTeam.players.filter((p) => +p.level === 1 && p.gender == Gender.MALE && p.post === strongPlayer.post);
    if (beginnerPlayersSamePost.length > 0) {
      weakPlayer = beginnerPlayersSamePost[0];
    } else {
      const beginnerPlayersDiffPost: Player[] = weakTeam.players.filter((p) => +p.level === 1 && p.gender == Gender.MALE);
      if (beginnerPlayersDiffPost.length > 0) {
        weakPlayer = beginnerPlayersDiffPost[0];
      } else if (strongPlayer.level > 2) {
        const intermediatePlayersSamePost: Player[] = weakTeam.players.filter((p) => +p.level === 1 && p.gender == Gender.MALE && p.post === strongPlayer.post);
        if (intermediatePlayersSamePost.length > 0) {
          weakPlayer = intermediatePlayersSamePost[0];
        } else {
          weakPlayer = weakTeam.players.filter((p) => +p.level === 1 && p.gender == Gender.MALE && p.post === strongPlayer.post)[0];
        }
      }
    }
    return weakPlayer;
  }

  private swapPlayers(weakestTeam: Team, strongestTeam: Team, weakPlayer: Player, strongPlayer: Player) {
    const teamA = this.currentSession.teams.find((t) => t.color === weakestTeam.color);
    const teamB = this.currentSession.teams.find((t) => t.color === strongestTeam.color);
    const indexA = teamA.players.findIndex((p) => p.uuid === weakPlayer?.uuid);
    const indexB = teamB.players.findIndex((p) => p.uuid === strongPlayer?.uuid);

    if (indexA >= 0 && indexB >= 0) {
      teamA.players.splice(indexA, 1);
      teamB.players.splice(indexB, 1);

      teamA.players.push(strongPlayer);
      teamB.players.push(weakPlayer);
    }
  }
}
