import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { SkillsInterface } from '../../core/models/skills.model';

export function bothFieldsRequired(): ValidatorFn {
  return function (
    control: AbstractControl<SkillsInterface | null>
  ): ValidationErrors | null {
    if (control.value) {
      return control.value.level && control.value.name
        ? null
        : { bothRequired: true };
    }

    return null;
  };
}
