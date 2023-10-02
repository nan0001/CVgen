import { createSelector } from '@ngrx/store';
import { projectsFeatureKey } from '.';
import { ProjectsState } from './projects.reducer';
import { ProjectInterface } from '../../core/models/project.model';
import { AppState } from '../../../store';

export const selectProjects = (state: AppState) => state[projectsFeatureKey];

export const selectProjectsCollection = createSelector(
  selectProjects,
  (state: ProjectsState) => state.projects
);

export const selectProjectById = (props: { id: string }) =>
  createSelector(selectProjects, (state: ProjectsState) => {
    const project: ProjectInterface | undefined = state.projects.find(
      elem => elem.id === props.id
    );

    if (project) {
      return project;
    }

    return null;
  });
