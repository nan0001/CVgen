import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoreModuleState, authFeatureKey, moduleFeatureKey } from '..';
import { AuthState } from '../reducers/auth.reducer';

export const selectModule =
  createFeatureSelector<CoreModuleState>(moduleFeatureKey);

export const selectAuthFeature = createSelector(
  selectModule,
  (state: CoreModuleState) => state[authFeatureKey]
);

export const selectEmail = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.email
);

export const selectAuthError = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.error
);
