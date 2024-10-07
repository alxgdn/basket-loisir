import { Component, Input } from '@angular/core';
import { Player } from '../../models/player.model';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { StarRateComponent } from '../star-rate/star-rate.component';
import { NgClass } from '@angular/common';
import { DisplayPostPipe } from '../../pipes/display-post.pipe';

@Component({
  selector: 'card-photo-item',
  standalone: true,
  imports: [
    TruncatePipe,
    StarRateComponent,
    NgClass,
    DisplayPostPipe,
  ],
  templateUrl: './card-photo-item.component.html',
  styleUrl: './card-photo-item.component.scss',
})
export class CardPhotoItemComponent {
  @Input({ required: true }) player: Player = {} as Player;
  @Input() showRating: boolean = false;
  @Input() selected: boolean = false;
  protected readonly Array = Array;
  protected readonly Number = Number;
}
