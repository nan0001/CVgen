import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable, map, take } from 'rxjs';
import { HasNameInterface } from '../models/has-name.model';

export function nameExistsValidator(
  observable: Observable<HasNameInterface[] | null>
): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return observable.pipe(
      take(1),
      map(val => {
        if (val) {
          const obj = val.find(
            (elem: HasNameInterface) => elem.name === control.value
          );
          return obj ? { nameExists: true } : null;
        }
        return null;
      })
    );
  };
}
