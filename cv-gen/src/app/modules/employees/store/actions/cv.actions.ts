import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CvInterface } from '../../../core/models/cv.models';

export const CvActions = createActionGroup({
  source: 'Cv',
  events: {
    'Load cvs': emptyProps(),
    'Success loading': props<{ data: CvInterface[] }>(),
    'Loading failure': emptyProps(),
    'Update cv': props<{
      data: Omit<CvInterface, 'id' | 'employeeId' | 'name'>;
      id: string;
    }>(),
    'Delete cv': props<{ id: string }>(),
    "ID doesn't exist": emptyProps(),
    'Add cv': props<{
      newValue: Omit<CvInterface, 'id'>;
    }>(),
    'Cv with such name already exists': emptyProps(),
    'Set picked Cv': props<{
      cv: CvInterface | null;
      updateEmployee?: boolean;
    }>(),
    'Void action': emptyProps(),
  },
});
