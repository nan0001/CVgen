import * as fromCv from './reducers/cv.reducer';
import * as fromEmployee from './reducers/employee.reducer';

export const cvFeatureKey = 'cv';
export const employeeFeatureKey = 'employee';
export const moduleFeatureKey = 'employeeModule';

export interface EmployeeModuleState {
  [cvFeatureKey]: fromCv.CvState;
  [employeeFeatureKey]: fromEmployee.EmployeeState;
}

export const reducers = {
  [cvFeatureKey]: fromCv.reducer,
  [employeeFeatureKey]: fromEmployee.reducer,
};
