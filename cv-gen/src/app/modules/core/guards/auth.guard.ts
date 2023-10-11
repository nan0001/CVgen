import { CanMatchFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { take, map } from 'rxjs';
import { selectEmail } from '../store/selectors/auth.selectors';

export const authGuard: CanMatchFn = () => {
  const store = inject(Store);
  const router = inject(Router);
  const user$ = store.select(selectEmail);
  return user$.pipe(
    take(1),
    map(user => {
      if (user) {
        return true;
      }

      return router.parseUrl('auth');
    })
  );
};
