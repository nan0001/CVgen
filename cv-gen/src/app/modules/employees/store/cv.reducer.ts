import { createReducer, on } from '@ngrx/store';
import { CvActions } from './cv.actions';
import { CvInterface } from '../../core/models/cv.models';

export interface CvState {
  cvs: CvInterface[];
  isLoading: boolean;
}

export const initialState: CvState = {
  cvs: [],
  isLoading: false,
};

export const reducer = createReducer(
  initialState,
  on(CvActions.loadCvs, (state): CvState => ({ ...state, isLoading: true })),
  on(
    CvActions.successLoading,
    (state, action): CvState => ({
      ...state,
      cvs: action.data,
      isLoading: false,
    })
  ),
  on(
    CvActions.loadingFailure,
    (state): CvState => ({ ...state, cvs: [], isLoading: false })
  )
);
