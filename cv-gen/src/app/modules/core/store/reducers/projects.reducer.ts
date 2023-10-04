import { createReducer, on } from '@ngrx/store';
import { ProjectsActions } from '../actions/projects.actions';
import { ProjectInterface } from '../../models/project.model';

export interface ProjectsState {
  projects: ProjectInterface[] | null;
  isLoading: boolean;
}

export const initialState: ProjectsState = {
  projects: null,
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
    (state): ProjectsState => ({ ...state, projects: null, isLoading: false })
  )
);
