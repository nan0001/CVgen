import { createReducer, on } from '@ngrx/store';
import { AuthActions } from '../actions/auth.actions';

export interface AuthState {
  email: string | null;
  error: string | null;
}

export const initialState: AuthState = {
  email: null,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(AuthActions.signOut, (state): AuthState => ({ ...state, email: null })),
  on(
    AuthActions.authFail,
    (state, action): AuthState => ({ ...state, error: action.error })
  ),
  on(
    AuthActions.userStatusChange,
    (state, action): AuthState => ({
      ...state,
      email: action.email,
      error: null,
    })
  )
);
