import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlayerForm } from '../../models/form.model';
import { MatInput } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatCard } from '@angular/material/card';
import { Player } from '../../../shared/models/player.model';
import { PlayerService } from '../../../shared/services/player.service';
import { map, Observable, switchMap } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@Component({
  selector: 'app-edit-player',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButton,
    MatInput,
    MatGridList,
    MatGridTile,
    MatCard,
  ],
  templateUrl: './edit-player.component.html',
})
@UntilDestroy()
export class EditPlayerComponent implements OnInit {
  formGroup: FormGroup;
  player: Player;

  constructor(private playerService: PlayerService, private router: Router, route: ActivatedRoute) {
    route.params.pipe(
      map((params) => {
        return params['uuid'];
      }),
      switchMap((uuid) => this.playerService.getPlayer(uuid)),
    )
      .pipe(untilDestroyed(this))
      .subscribe((player) => {
        this.player = player;
        if (!!player) {
          this.formGroup.patchValue({
            gender: player.gender,
            lastname: player.lastname,
            firstname: player.firstname,
            level: player.level,
            post: player.post,
          });
        }
      });
  }

  ngOnInit() {
    this.formGroup = new FormGroup<PlayerForm>({
      gender: new FormControl<number>(null, [Validators.required]),
      lastname: new FormControl<string>('', [Validators.required]),
      firstname: new FormControl<string>('', [Validators.required]),
      level: new FormControl<number>(null, [Validators.required]),
      post: new FormControl<string>('', [Validators.required]),
      picture: new FormControl<string>(''),
    });
  }

  validate() {
    let obs: Observable<any>;
    if (!this.player) {
      obs = this.playerService.createPlayer(this.formToPlayer());
    } else {
      obs = this.playerService.editPlayer(this.player.uuid, this.formToPlayer());
    }
    obs.pipe(untilDestroyed(this)).subscribe(() => {
      this.backToList();
    });
  }

  cancel() {
    this.backToList();
  }

  private formToPlayer(): Partial<Player> {
    return {
      gender: this.formGroup.get('gender')?.value,
      lastname: this.formGroup.get('lastname')?.value,
      firstname: this.formGroup.get('firstname')?.value,
      level: this.formGroup.get('level')?.value,
      post: this.formGroup.get('post')?.value,
      picture: this.formGroup.get('picture')?.value,
    };
  }

  private backToList() {
    this.router.navigateByUrl(`/admin`);
  }
}
