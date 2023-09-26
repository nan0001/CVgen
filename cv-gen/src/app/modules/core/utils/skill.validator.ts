import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { SkillsInterface } from '../models/skills.model';

export function bothFieldsRequired(): ValidatorFn {
  return function (
    control: AbstractControl<SkillsInterface | null>
  ): ValidationErrors | null {
    if (control.value) {
      return control.value.name ? null : { bothRequired: true };
    }

    return { bothRequired: true };
  };
}
