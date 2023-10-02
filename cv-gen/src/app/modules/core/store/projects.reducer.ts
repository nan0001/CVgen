import { createReducer, on } from '@ngrx/store';
import { ProjectsActions } from './projects.actions';
import { ProjectInterface } from '../../core/models/project.model';

export interface ProjectsState {
  projects: ProjectInterface[];
  isLoading: boolean;
}

export const initialState: ProjectsState = {
  projects: [],
  isLoading: false,
};

export const reducer = createReducer(
  initialState,
  on(
    ProjectsActions.loadProjects,
    (state): ProjectsState => ({ ...state, isLoading: true })
  ),
  on(
    ProjectsActions.successLoading,
    (state, action): ProjectsState => ({
      ...state,
      projects: action.data,
      isLoading: false,
    })
  ),
  on(
    ProjectsActions.loadingFailure,
    (state): ProjectsState => ({ ...state, projects: [], isLoading: false })
  )
);
