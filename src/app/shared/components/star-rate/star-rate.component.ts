import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { UntilDestroy } from '@ngneat/until-destroy';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-star-rate',
  standalone: true,
  imports: [
    MatIcon,
    DecimalPipe,
  ],
  templateUrl: './star-rate.component.html',
})
@UntilDestroy()
export class StarRateComponent {
  @Input()
  value: number;
}
