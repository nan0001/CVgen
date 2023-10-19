import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable, map, take } from 'rxjs';

export function entityExistsValidator(
  observable: Observable<string[]>
): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return observable.pipe(
      take(1),
      map(val => {
        if (val) {
          const obj = val.find(elem => elem === control.value);

          return obj ? { entityExists: true } : null;
        }

        return null;
      })
    );
  };
}
