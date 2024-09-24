import { Pipe, PipeTransform } from '@angular/core';
import { Player } from '../models/player.model';

@Pipe({
  name: 'isSelected',
  standalone: true,
  pure: false,
})
export class IsSelectedPipe implements PipeTransform {

  transform(value: Player[], player: Player): any {
    return value.filter((p) => p.uuid === player.uuid).length > 0;
  }

}
