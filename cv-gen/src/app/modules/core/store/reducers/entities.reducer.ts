import { createReducer, on } from '@ngrx/store';
import { EntitiesActions } from '../actions/entities.actions';

export interface EntitiesState {
  responsibilities: string[];
  langs: string[];
  skills: string[];
  isLoading: boolean;
}

export const initialState: EntitiesState = {
  responsibilities: [],
  langs: [],
  skills: [],
  isLoading: false,
};

export const reducer = createReducer(
  initialState,
  on(
    EntitiesActions.loadEntities,
    (state): EntitiesState => ({ ...state, isLoading: true })
  ),
  on(
    EntitiesActions.successLoading,
    (state, action): EntitiesState => ({
      ...state,
      responsibilities: action.responsibilities,
      skills: action.skills,
      langs: action.langs,
      isLoading: false,
    })
  ),
  on(
    EntitiesActions.loadingFailure,
    (state): EntitiesState => ({
      ...state,
      responsibilities: [],
      skills: [],
      langs: [],
      isLoading: false,
    })
  )
);
