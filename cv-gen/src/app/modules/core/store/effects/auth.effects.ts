import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { AuthActions } from '../actions/auth.actions';
import { AuthError } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  public signIn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signIn),
      switchMap(action => {
        const signIn$ = this.authService.signIn(action.email, action.password);

        const authAction$ = signIn$.pipe(
          map(userCreds => {
            this.router.navigate(['']);
            return AuthActions.userStatusChange({
              email: userCreds.user.email,
            });
          }),
          catchError((error: AuthError) => {
            console.warn(error);
            return of(AuthActions.authFail({ error: error.message }));
          })
        );

        return authAction$;
      })
    );
  });

  public signOut$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signOut),
      switchMap(() => {
        const signOut$ = this.authService.signOut();

        const authAction$ = signOut$.pipe(
          map(() => {
            this.router.navigate(['auth']);
            return AuthActions.userStatusChange({
              email: null,
            });
          }),
          catchError((error: AuthError) => {
            console.warn(error);
            return of(AuthActions.authFail({ error: error.message }));
          })
        );

        return authAction$;
      })
    );
  });

  public checkSigned$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.checkUser),
      switchMap(() => {
        const user$ = this.authService.getUser();

        return user$.pipe(
          map(user => {
            const email = user ? user.email : null;
            return AuthActions.userStatusChange({ email });
          })
        );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
