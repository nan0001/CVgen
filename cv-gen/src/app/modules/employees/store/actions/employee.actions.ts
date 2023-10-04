import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { EmployeeInterface } from '../../../core/models/employee.model';

export const EmployeeActions = createActionGroup({
  source: 'Employee',
  events: {
    'Load employees': props<{ update: boolean }>(),
    'Success loading': props<{ data: EmployeeInterface[] }>(),
    'Loading failure': emptyProps(),
    'Delete employee': props<{ id: string }>(),
    'Update employee': props<{
      newValue: Omit<EmployeeInterface, 'id' | 'cvsId'>;
      id: string;
    }>(),
  },
});
