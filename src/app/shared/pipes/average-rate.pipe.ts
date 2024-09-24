import { Pipe, PipeTransform } from '@angular/core';
import { Player } from '../models/player.model';
import { TeamUtils } from '../helpers/team.utils';

@Pipe({
  name: 'averageRate',
  standalone: true,
})
export class AverageRatePipe implements PipeTransform {

  transform(value: Player[]): number {
    return TeamUtils.calculateAverageRate(value);
  }

}
