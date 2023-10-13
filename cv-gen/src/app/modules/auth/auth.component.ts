import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormControl,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { ValidatorType } from './models/validator.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthActions } from '../core/store/actions/auth.actions';
import { selectAuthError } from '../core/store/selectors/auth.selectors';
import { ThemeService } from '../core/services/theme.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
  public authForm = this.fb.nonNullable.group({
    username: [
      '',
      [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        Validators.email,
      ],
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(15),
        this.createValidator('hasLowerCase'),
        this.createValidator('hasUpperCase'),
        this.createValidator('hasNumeric'),
        this.createValidator('hasSpecialChars'),
      ],
    ],
  });
  public currentTheme$ = this.themeService.currentTheme$;
  public loginError$ = this.store.select(selectAuthError);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store,
    private themeService: ThemeService
  ) {}

  public get username(): FormControl<string> {
    return this.authForm.controls.username;
  }

  public get password(): FormControl<string> {
    return this.authForm.controls.password;
  }

  public onSubmit(): void {
    if (this.authForm.valid) {
      this.store.dispatch(
        AuthActions.signIn({
          email: this.username.value,
          password: this.password.value,
        })
      );
    }

    this.authForm.markAllAsTouched();
  }

  public onCancel(): void {
    this.router.navigate(['']);
  }

  private createValidator(propName: ValidatorType): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      let passwordValid = false;

      switch (propName) {
        case 'hasLowerCase':
          passwordValid = /[a-z]+/.test(value);
          break;
        case 'hasNumeric':
          passwordValid = /[0-9]+/.test(value);
          break;
        case 'hasUpperCase':
          passwordValid = /[A-Z]+/.test(value);
          break;
        case 'hasSpecialChars':
          passwordValid = /\W|_+/.test(value);
          break;
        default:
          passwordValid = true;
          break;
      }

      return !passwordValid ? { [propName]: true } : null;
    };
  }
}
