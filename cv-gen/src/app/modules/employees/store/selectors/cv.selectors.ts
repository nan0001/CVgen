import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EmployeeModuleState, cvFeatureKey, moduleFeatureKey } from '..';
import { CvState } from '../reducers/cv.reducer';
import { CvInterface } from '../../../core/models/cv.models';

export const selectModule =
  createFeatureSelector<EmployeeModuleState>(moduleFeatureKey);

export const selectCvs = createSelector(
  selectModule,
  (state: EmployeeModuleState) => state[cvFeatureKey]
);

export const selectCvsCollection = createSelector(
  selectCvs,
  (state: CvState) => state.cvs
);

export const selectCvById = (props: { id: string }) =>
  createSelector(selectCvs, (state: CvState) => {
    const cv: CvInterface | undefined = state.cvs.find(
      elem => elem.id === props.id
    );

    if (cv) {
      return cv;
    }

    return null;
  });

export const selectCvsArrayByEmployeeId = (props: { employeeId: string }) =>
  createSelector(selectCvs, (state: CvState) => {
    return state.cvs.filter(val => val.employeeId === props.employeeId);
  });

export const selectNewlyAddedCv = (props: { newCv: Omit<CvInterface, 'id'> }) =>
  createSelector(selectCvs, (state: CvState) => {
    const cvWithId = state.cvs.find(
      val =>
        val.employeeId === props.newCv.employeeId &&
        val.name === props.newCv.name
    );
    return cvWithId ? cvWithId : null;
  });
