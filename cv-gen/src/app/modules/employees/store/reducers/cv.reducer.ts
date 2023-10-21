import { createReducer, on } from '@ngrx/store';
import { CvActions } from '../actions/cv.actions';
import { CvInterface } from '../../../core/models/cv.models';

export interface CvState {
  cvs: CvInterface[];
  isLoading: boolean;
  pickedCv: CvInterface | null;
}

export const initialState: CvState = {
  cvs: [],
  isLoading: false,
  pickedCv: null,
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
  ),
  on(
    CvActions.setPickedCv,
    (state, action): CvState => ({ ...state, pickedCv: action.cv })
  )
);
