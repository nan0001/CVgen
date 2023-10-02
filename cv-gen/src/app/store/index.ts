import { cvFeatureKey } from '../modules/employees/store';
import { CvState } from '../modules/employees/store/cv.reducer';
import { projectsFeatureKey } from '../modules/core/store';
import { ProjectsState } from '../modules/core/store/projects.reducer';

export interface AppState {
  [cvFeatureKey]: CvState;
  [projectsFeatureKey]: ProjectsState;
}
