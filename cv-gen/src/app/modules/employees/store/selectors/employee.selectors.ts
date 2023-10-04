import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EmployeeModuleState, employeeFeatureKey } from '../';
import { EmployeeState } from '../reducers/employee.reducer';
import { EmployeeInterface } from '../../../core/models/employee.model';

export const selectModule =
  createFeatureSelector<EmployeeModuleState>('employeeModule');

export const selectEmployees = createSelector(
  selectModule,
  (state: EmployeeModuleState) => state[employeeFeatureKey]
);

export const selectEmployeeCollection = createSelector(
  selectEmployees,
  (state: EmployeeState) => state.employees
);

export const selectEmployeeById = (props: { id: string }) =>
  createSelector(selectEmployees, (state: EmployeeState) => {
    const employee: EmployeeInterface | undefined = state.employees?.find(
      elem => elem.id === props.id
    );

    if (employee) {
      return employee;
    }

    return null;
  });
