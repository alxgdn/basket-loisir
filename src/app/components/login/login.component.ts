import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { catchError, filter, tap } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  imports: [
    MatIcon,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatInput,
    MatButton,
    FaIconComponent,
    RouterLink,
  ],
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;
  loginError = false;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.formGroup = new FormGroup<any>({
      email: new FormControl<string>('', [Validators.email, Validators.required]),
      password: new FormControl<string>('', [Validators.required]),
    });
  }

  loginWithEmail() {
    this.userService.loginWithEmail(this.formGroup.get('email').value, this.formGroup.get('password').value)
      .pipe(
        catchError((err) => {
          throw err;
        }),
      )
      .subscribe({
        next: () => {
          this.loginError = false;
          this.router.navigateByUrl('/').then();
        },
        error: () => {
          this.loginError = true;
        },
      });
  }

  loginWithGoogle() {
    this.userService.loginWithGoogle()
      .pipe(
        filter((user) => !!user),
        tap(() => this.router.navigateByUrl('/')),
      )
      .subscribe(() => {
      });
  }

  get emailFormControl() {
    return this.formGroup.get('email');
  }

  get passwordFormControl() {
    return this.formGroup.get('password');
  }

  protected readonly faGoogle = faGoogle;
}
