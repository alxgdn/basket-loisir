import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayPost',
  standalone: true,
})
export class DisplayPostPipe implements PipeTransform {

  transform(value: 'GUARD' | 'FORWARD' | 'CENTER'): string {
    switch (value) {
      case 'GUARD':
        return 'Meneur';
      case 'FORWARD':
        return 'Ailier';
      case 'CENTER':
        return 'Pivot';
    }
  }

}
