import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ProjectInterface } from '../models/project.model';

export function noConflictDates(): ValidatorFn {
  return function (
    control: AbstractControl<Pick<ProjectInterface, 'start' | 'end'> | null>
  ): ValidationErrors | null {
    if (control.value) {
      if (!control.value.start) {
        return { noStartDate: true };
      }

      if (!control.value.end) {
        return { noEndDate: true };
      }

      return control.value.start > control.value.end
        ? { noConflictDates: true }
        : null;
    }

    return null;
  };
}
