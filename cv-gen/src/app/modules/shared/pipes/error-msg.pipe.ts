import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { ERRORS } from '../../auth/constants/errors.constant';
import { LanguageService } from '../../core/services/language.service';
import { Observable, of } from 'rxjs';

@Pipe({
  name: 'errorMsg',
})
export class ErrorMsgPipe implements PipeTransform {
  constructor(private langService: LanguageService) {}

  transform(errors: ValidationErrors | null, name: string): Observable<string> {
    let message = of('Ok');

    ERRORS.every(val => {
      if (errors && val.error in errors) {
        const param: { [key: string]: string } = val.numerical
          ? { num: String(errors?.[val.error].requiredLength) }
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
