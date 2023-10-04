import * as fromProjects from './reducers/projects.reducer';
import * as fromEntities from './reducers/entities.reducer';

export const projectsFeatureKey = 'projects';
export const entitiesFeatureKey = 'entities';
export const moduleFeatureKey = 'coreModule';

export interface CoreModuleState {
  [projectsFeatureKey]: fromProjects.ProjectsState;
  [entitiesFeatureKey]: fromEntities.EntitiesState;
}

export const reducers = {
  [projectsFeatureKey]: fromProjects.reducer,
  [entitiesFeatureKey]: fromEntities.reducer,
};
