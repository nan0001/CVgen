import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoreModuleState, moduleFeatureKey, projectsFeatureKey } from '..';
import { ProjectsState } from '../reducers/projects.reducer';
import { ProjectInterface } from '../../models/project.model';

export const selectModule =
  createFeatureSelector<CoreModuleState>(moduleFeatureKey);

export const selectProjectsFeature = createSelector(
  selectModule,
  (state: CoreModuleState) => state[projectsFeatureKey]
);

export const selectProjectsCollection = createSelector(
  selectProjectsFeature,
  (state: ProjectsState) => state.projects
);

export const selectProjectsLoading = createSelector(
  selectProjectsFeature,
  (state: ProjectsState) => state.isLoading
);

export const selectProjectById = (props: { id: string }) =>
  createSelector(selectProjectsFeature, (state: ProjectsState) => {
    const project: ProjectInterface | undefined = state.projects?.find(
      elem => elem.id === props.id
    );

    if (project) {
      return project;
    }

    return null;
  });

export const selectProjectNameById = (props: { id: string }) =>
  createSelector(
    selectProjectById({ id: props.id }),
    (project: ProjectInterface | null) => {
      return project ? project.name : '';
    }
  );

export const selectProjectCrumbById = (props: { id: string; link: string }) =>
  createSelector(
    selectProjectById({ id: props.id }),
    (project: ProjectInterface | null) => {
      return {
        label: project ? project.name : '',
        routerLink: props.link,
      };
    }
  );
