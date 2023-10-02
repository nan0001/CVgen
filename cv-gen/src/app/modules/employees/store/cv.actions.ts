import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CvInterface } from '../../core/models/cv.models';
import { ProjectInterface } from '../../core/models/project.model';

export const CvActions = createActionGroup({
  source: 'Cv',
  events: {
    'Load cvs': emptyProps(),
    'Success loading': props<{ data: CvInterface[] }>(),
    'Loading failure': emptyProps(),
    'Update projects': props<{ data: ProjectInterface[] }>(),
  },
});
