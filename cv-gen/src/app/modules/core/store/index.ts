import * as fromProjects from './reducers/projects.reducer';
import * as fromEntities from './reducers/entities.reducer';
import * as fromAuth from './reducers/auth.reducer';

export const projectsFeatureKey = 'projects';
export const entitiesFeatureKey = 'entities';
export const authFeatureKey = 'auth';
export const moduleFeatureKey = 'coreModule';

export interface CoreModuleState {
  [projectsFeatureKey]: fromProjects.ProjectsState;
  [entitiesFeatureKey]: fromEntities.EntitiesState;
  [authFeatureKey]: fromAuth.AuthState;
}

export const reducers = {
  [projectsFeatureKey]: fromProjects.reducer,
  [entitiesFeatureKey]: fromEntities.reducer,
  [authFeatureKey]: fromAuth.reducer,
};
