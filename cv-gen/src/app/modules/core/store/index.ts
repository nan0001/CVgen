import * as fromProjects from './projects.reducer';

export const projectsFeatureKey = 'projects';

export interface State {
  [projectsFeatureKey]: fromProjects.ProjectsState;
}

export const reducers = fromProjects.reducer;
