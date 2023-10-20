import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EmployeeModuleState, employeeFeatureKey, moduleFeatureKey } from '../';
import { EmployeeState } from '../reducers/employee.reducer';
import { EmployeeInterface } from '../../../core/models/employee.model';

export const selectModule =
  createFeatureSelector<EmployeeModuleState>(moduleFeatureKey);

export const selectEmployees = createSelector(
  selectModule,
  (state: EmployeeModuleState) => state[employeeFeatureKey]
);

export const selectEmployeeCollection = createSelector(
  selectEmployees,
  (state: EmployeeState) => state.employees
);

export const selectEmployeeLoading = createSelector(
  selectEmployees,
  (state: EmployeeState) => state.isLoading
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

export const selectEmployeeNameById = (props: { id: string }) =>
  createSelector(
    selectEmployeeById({ id: props.id }),
    (employee: EmployeeInterface | null) => {
      return employee ? employee.firstName + ' ' + employee.lastName : '';
    }
  );

export const selectEmployeeCrumbById = (props: { id: string; link: string }) =>
  createSelector(
    selectEmployeeById({ id: props.id }),
    (employee: EmployeeInterface | null) => {
      return {
        label: employee ? employee.firstName + ' ' + employee.lastName : '',
        routerLink: props.link,
      };
    }
  );
