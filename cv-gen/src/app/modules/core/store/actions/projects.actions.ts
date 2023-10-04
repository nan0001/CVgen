import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ProjectInterface } from '../../../core/models/project.model';

export const ProjectsActions = createActionGroup({
  source: 'Projects',
  events: {
    'Load projects': props<{ update: boolean }>(),
    'Success loading': props<{ data: ProjectInterface[] }>(),
    'Loading failure': emptyProps(),
    'Delete project': props<{ id: string }>(),
    'Update project': props<{
      newValue: Omit<ProjectInterface, 'id'>;
      id: string;
    }>(),
    "ID doesn't exist": emptyProps(),
    'Add project': props<{
      newValue: Omit<ProjectInterface, 'id'>;
    }>(),
    'Project with such name already exists': emptyProps(),
  },
});
