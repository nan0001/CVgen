import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProjectsService } from '../../../core/services/projects.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ProjectsActions } from '../../../core/store/actions/projects.actions';
import { CvActions } from '../../../employees/store/actions/cv.actions';

@Injectable()
export class ProjectEffects {
  public loadProjects$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CvActions.successLoading, ProjectsActions.loadProjects),
      switchMap(() => {
        const projectsCollection$ = this.projectsService.getProjects();

        const projectsAction$ = projectsCollection$.pipe(
          map(response => {
            return ProjectsActions.successLoading({ data: response });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            console.warn(errorResponse);
            return of(ProjectsActions.loadingFailure());
          })
        );

        return projectsAction$;
      })
    );
  });

  constructor(
    private actions$: Actions,
    private projectsService: ProjectsService
  ) {}
}
