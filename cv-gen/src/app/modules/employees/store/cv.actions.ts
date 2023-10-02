import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CvInterface } from '../../core/models/cv.models';

export const CvActions = createActionGroup({
  source: 'Cv',
  events: {
    'Load cvs': emptyProps(),
    'Success loading': props<{ data: CvInterface[] }>(),
    'Loading failure': emptyProps(),
  },
});
