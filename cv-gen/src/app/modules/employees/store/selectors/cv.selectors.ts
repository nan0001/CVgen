import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EmployeeModuleState, cvFeatureKey, moduleFeatureKey } from '..';
import { CvState } from '../reducers/cv.reducer';
import { CvInterface, CvWithProjects } from '../../../core/models/cv.models';

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

export const selectCvWithProjectsById = (props: { id: string }) =>
  createSelector(selectCvs, (state: CvState) => {
    const cv: CvWithProjects | undefined = state.cvsWithProjects.find(
      elem => elem.id === props.id
    );

    if (cv) {
      return cv;
    }

    return null;
  });

export const selectCvsArrayById = (props: { ids: string[] }) =>
  createSelector(selectCvs, (state: CvState) => {
    const cvsArray: CvInterface[] = [];

    props.ids.forEach(id => {
      const cv: CvInterface | undefined = state.cvs.find(
        elem => elem.id === id
      );

      if (cv) {
        cvsArray.push(cv);
      }
    });

    return cvsArray;
  });
