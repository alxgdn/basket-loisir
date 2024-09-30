import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { UntilDestroy } from '@ngneat/until-destroy';
import { DecimalPipe } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-star-rate',
  standalone: true,
  imports: [
    MatIcon,
    DecimalPipe,
    MatTooltipModule,
  ],
  templateUrl: './star-rate.component.html',
})
@UntilDestroy()
export class StarRateComponent {
  @Input()
  value: number;
}
