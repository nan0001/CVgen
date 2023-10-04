import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoreModuleState, entitiesFeatureKey, moduleFeatureKey } from '..';
import { EntitiesState } from '../reducers/entities.reducer';
import { EntitiesListsType } from '../../models/entities.model';

export const selectModule =
  createFeatureSelector<CoreModuleState>(moduleFeatureKey);

export const selectEntities = createSelector(
  selectModule,
  (state: CoreModuleState) => state[entitiesFeatureKey]
);

export const selectLangs = createSelector(
  selectEntities,
  (state: EntitiesState) => state.langs
);

export const selectEntitytList = (props: { id: EntitiesListsType }) =>
  createSelector(selectEntities, (state: EntitiesState) => state[props.id]);

export const selectSkills = createSelector(
  selectEntities,
  (state: EntitiesState) => state.skills
);

export const selectResponsibilities = createSelector(
  selectEntities,
  (state: EntitiesState) => state.responsibilities
);
