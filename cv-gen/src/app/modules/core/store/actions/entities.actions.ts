import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { EntitiesListsType } from '../../models/entities.model';

export const EntitiesActions = createActionGroup({
  source: 'Entities',
  events: {
    'Load entities': emptyProps(),
    'Success loading': props<{
      [key in EntitiesListsType]: string[];
    }>(),
    'Loading failure': emptyProps(),
    'Delete item': props<{ list: EntitiesListsType; item: string }>(),
    'Add item': props<{ list: EntitiesListsType; item: string }>(),
    "Item doesn't exist": emptyProps(),
    'Item already exists': emptyProps(),
  },
});
