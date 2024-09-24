import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class IsAdminGuard {
  constructor() {
  }

  canActivate() {
    // todo
    return true;
  }
}
