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
        Validators.minLength(3),
        Validators.maxLength(25),
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
    // TODO: refactor code below
    if (control.hasError('required')) {
      // return `Enter your ${name}.`;
      return this.langService.getTranslationObservable('AUTH.errors.required', {
        name,
      });
    }

    if (control.hasError('email')) {
      // return `Enter your ${name}.`;
      return this.langService.getTranslationObservable('AUTH.errors.email', {
        name,
      });
    }

    if (control.hasError('minlength')) {
      // return `Minimum length is ${control.errors?.['minlength'].requiredLength} characters.`;
      const num = control.errors?.['minlength'].requiredLength;
      return this.langService.getTranslationObservable(
        'AUTH.errors.minlength',
        {
          num,
        }
      );
    }

    if (control.hasError('maxlength')) {
      // return `Maximum length is ${control.errors?.['maxlength'].requiredLength} characters.`;
      const num = control.errors?.['maxlength'].requiredLength;
      return this.langService.getTranslationObservable(
        'AUTH.errors.maxlength',
        {
          num,
        }
      );
    }

    if (control.hasError('hasNumeric')) {
      // return `${
      //   name[0].toUpperCase() + name.slice(1)
      // } must contain at least one number.`;
      return this.langService.getTranslationObservable(
        'AUTH.errors.hasNumeric',
        {
          name,
        }
      );
    }

    if (control.hasError('hasLowerCase')) {
      // return `${
      //   name[0].toUpperCase() + name.slice(1)
      // } must contain at least one lower case character.`;
      return this.langService.getTranslationObservable(
        'AUTH.errors.hasLowerCase',
        {
          name,
        }
      );
    }

    if (control.hasError('hasUpperCase')) {
      // return `${
      //   name[0].toUpperCase() + name.slice(1)
      // } must contain at least one upper case character.`;
      return this.langService.getTranslationObservable(
        'AUTH.errors.hasUpperCase',
        {
          name,
        }
      );
    }

    if (control.hasError('hasSpecialChars')) {
      // return `${
      //   name[0].toUpperCase() + name.slice(1)
      // } must contain at least one special character.`;
      return this.langService.getTranslationObservable(
        'AUTH.errors.hasSpecialChars',
        {
          name,
        }
      );
    }

    return of('Ok');
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
