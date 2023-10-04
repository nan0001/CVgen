import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CvService } from '../../../core/services/cv.service';
import { CvActions } from '../actions/cv.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ProjectsActions } from '../../../core/store/actions/projects.actions';

@Injectable()
export class CvEffects {
  public loadCvs$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CvActions.loadCvs),
      switchMap(() => {
        const cvCollection$ = this.cvService.getCvs();

        const cvAction$ = cvCollection$.pipe(
          map(response => {
            return CvActions.successLoading({ data: response });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            console.warn(errorResponse);
            return of(CvActions.loadingFailure());
          })
        );

        return cvAction$;
      })
    );
  });

  public updateCvProjects = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProjectsActions.successLoading),
      map(action => {
        return CvActions.updateProjects({ data: action.data });
      })
    );
  });

  constructor(
    private actions$: Actions,
    private cvService: CvService
  ) {}
}