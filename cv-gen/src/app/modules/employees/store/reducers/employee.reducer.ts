import { createReducer, on } from '@ngrx/store';
import { EmployeeInterface } from '../../../core/models/employee.model';
import { EmployeeActions } from '../actions/employee.actions';

export interface EmployeeState {
  employees: EmployeeInterface[] | null;
  isLoading: boolean;
}

export const initialState: EmployeeState = {
  employees: null,
  isLoading: false,
};

export const reducer = createReducer(
  initialState,
  on(
    EmployeeActions.loadEmployees,
    (state): EmployeeState => ({ ...state, isLoading: true })
  ),
  on(EmployeeActions.successLoading, (state, action): EmployeeState => {
    if (action.data) {
      return {
        ...state,
        employees: action.data,
        isLoading: false,
      };
    }

    return state;
  }),
  on(
    EmployeeActions.loadingFailure,
    (state): EmployeeState => ({ ...state, employees: null, isLoading: false })
  )
);
