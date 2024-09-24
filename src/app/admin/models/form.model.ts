import { AbstractControl } from '@angular/forms';

export interface PlayerForm {
  gender: AbstractControl<number>;
  lastname: AbstractControl<string>;
  firstname: AbstractControl<string>;
  level: AbstractControl<number>;
  post: AbstractControl<string>;
  picture: AbstractControl<string>;
}
