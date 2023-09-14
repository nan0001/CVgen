import { Injectable } from '@angular/core';
import { LanguageService } from './language.service';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ERRORS } from '../../auth/constants/errors.constant';

@Injectable({
  providedIn: 'root',
})
export class ValidationErrorService {
  constructor(private langService: LanguageService) {}

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
          'ERRORS.' + val.error,
          param
        );

        return false;
      }

      return true;
    });

    return message;
  }
}
