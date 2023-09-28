import { Pipe, PipeTransform } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EmployeeFormInterface } from '../../core/models/employee.model';

@Pipe({
  name: 'getControl',
})
export class GetControlPipe implements PipeTransform {
  transform(
    infoForm: FormGroup<EmployeeFormInterface>,
    controlName: string
  ): FormControl | null {
    return infoForm.get(controlName) as FormControl;
  }
}
