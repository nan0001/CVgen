import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Sign in': props<{
      email: string;
      password: string;
    }>(),
    'Sign out': emptyProps(),
    'User status change': props<{
      email: string | null;
    }>(),
    'Check user': emptyProps(),
    'Auth fail': props<{
      error: string | null;
    }>(),
  },
});
