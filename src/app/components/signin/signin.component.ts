import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { passwordMatching } from '../../shared/validators/password-matching.validator';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
  standalone: true,
  imports: [
    MatIcon,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    RouterLink,
    MatInputModule,
  ],
})
export class SigninComponent implements OnInit {

  formGroup: FormGroup;
  userExistsError = false;
  genericError = false;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.formGroup = new FormGroup<any>(
      {
        email: new FormControl<string>('', [Validators.email, Validators.required]),
        password: new FormControl<string>('', [Validators.required, Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+]).{8,}/)]),
        confirmPassword: new FormControl<string>('', [Validators.required]),
      },
      {
        validators: passwordMatching.bind(this),
      },
    );
  }

  signin() {
    this.userExistsError = false;
    this.genericError = false;
    this.userService.signinWithEmail(this.emailFormControl.value, this.passwordFormControl.value)
      .pipe(
        catchError((err) => {
          throw err;
        }),
      )
      .subscribe({
        next: () => {
          this.genericError = false;
          this.router.navigateByUrl('/').then();
        },
        error: (err) => {
          if (err.code === 'auth/email-already-in-use') {
            this.userExistsError = true;
          } else {
            this.genericError = true;
          }
        },
      });
  }

  get emailFormControl() {
    return this.formGroup.get('email');
  }

  get passwordFormControl() {
    return this.formGroup.get('password');
  }

  get confirmPasswordFormControl() {
    return this.formGroup.get('confirmPassword');
  }
}
