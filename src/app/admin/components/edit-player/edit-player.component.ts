import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlayerForm } from '../../models/form.model';
import { MatInput } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCard } from '@angular/material/card';
import { Player } from '../../../shared/models/player.model';
import { PlayerService } from '../../../shared/services/player.service';
import { map, Observable, switchMap } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatIcon } from '@angular/material/icon';
import { DropFileDirective } from '../../../shared/directives/drop-file.directive';

@Component({
  selector: 'app-edit-player',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatInput,
    MatGridListModule,
    MatCard,
    MatIcon,
    DropFileDirective,
  ],
  templateUrl: './edit-player.component.html',
  styleUrl: './edit-player.component.scss',
})
@UntilDestroy()
export class EditPlayerComponent {
  formGroup: FormGroup;
  player: Player;
  hasPictureError: boolean = false;

  constructor(private playerService: PlayerService, private router: Router, route: ActivatedRoute) {
    this.formGroup = new FormGroup<PlayerForm>({
      gender: new FormControl<number>(null, [Validators.required]),
      lastname: new FormControl<string>('', [Validators.required]),
      firstname: new FormControl<string>('', [Validators.required]),
      level: new FormControl<number>(null, [Validators.required]),
      post: new FormControl<string>('', [Validators.required]),
      picture: new FormControl<string>(''),
    });

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
            picture: player.picture
          });
        }
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
    this.router.navigateByUrl(`/admin`).then();
  }

  onPictureChange($event: Event) {
    const target: HTMLInputElement = $event.target as HTMLInputElement;
    if (target?.files?.[0]) {
      const file: File = target.files[0];
      this.readFile(file);
    }
    console.log($event);
  }

  deletePicture() {
    this.formGroup.get('picture').setValue('');
  }

  fileDropped(file: File) {
    if (!!file && file.type.includes('image/')) {
      this.hasPictureError = false;
      this.readFile(file);
    } else {
      this.hasPictureError = true;
    }
  }

  private readFile(file: File) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.formGroup.get('picture')?.setValue(reader.result as string);
    });
    reader.readAsDataURL(file);
  }
}
