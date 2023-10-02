import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ProjectInterface } from '../../core/models/project.model';

export const ProjectsActions = createActionGroup({
  source: 'Projects',
  events: {
    'Load projects': emptyProps(),
    'Success loading': props<{ data: ProjectInterface[] }>(),
    'Loading failure': emptyProps(),
  },
});
