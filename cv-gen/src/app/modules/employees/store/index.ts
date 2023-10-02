import * as fromCv from './cv.reducer';

export const cvFeatureKey = 'cv';

export interface State {
  [cvFeatureKey]: fromCv.CvState;
}

export const reducers = fromCv.reducer;
