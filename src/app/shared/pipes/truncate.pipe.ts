import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true,
})
export class TruncatePipe implements PipeTransform {
  transform(val: string, limit: number, ellipsis = ''): string {
    let value = val;
    if (!!value && value.length > limit) {
      value = `${value.substring(0, limit)}${ellipsis}`;
    }
    return value;
  }
}
