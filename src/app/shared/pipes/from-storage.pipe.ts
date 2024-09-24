import { inject, Pipe, PipeTransform } from '@angular/core';
import { getDownloadURL, listAll, ref, Storage } from '@angular/fire/storage';
import { from, Observable } from 'rxjs';

@Pipe({
  name: 'fromStorage',
  standalone: true,
})
export class FromStoragePipe implements PipeTransform {

  constructor(private storage: Storage) {
  }

  transform(value: string): Observable<string> {
    let path = 'players/unknown.jpg';
    if (!!value) {
      path = value;
    }
    return from(getDownloadURL(ref(this.storage, path)));
  }

}
