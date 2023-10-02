import { createSelector } from '@ngrx/store';
import { AppState } from '../../../store';
import { cvFeatureKey } from '.';
import { CvState } from './cv.reducer';
import { CvInterface } from '../../core/models/cv.models';

export const selectCvs = (state: AppState) => state[cvFeatureKey];

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
