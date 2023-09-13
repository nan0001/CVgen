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
import { Observable, of } from 'rxjs';
import { LanguageService } from '../core/services/language.service';
import { ERRORS } from './constants/errors.constant';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
  public authForm = this.fb.group({
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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private langService: LanguageService
  ) {}

  public get username(): FormControl<string | null> {
    return this.authForm.controls.username;
  }

  public get password(): FormControl<string | null> {
    return this.authForm.controls.password;
  }

  public onSubmit(): void {
    console.log(this.authForm);
    if (this.authForm.valid) {
      this.router.navigate(['']);
    }

    this.authForm.markAllAsTouched();
  }

  public onCancel(): void {
    this.router.navigate(['']);
  }

  public showError(
    control: FormControl<string | null>,
    name: string
  ): Observable<string> {
    let message = of('Ok');

    ERRORS.every(val => {
      if (control.hasError(val.error)) {
        const param: { [key: string]: string } = val.numerical
          ? { num: String(control.errors?.[val.error].requiredLength) }
          : { name };
        message = this.langService.getTranslationObservable(
          'AUTH.errors.' + val.error,
          param
        );

        return false;
      }

      return true;
    });

    return message;
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
