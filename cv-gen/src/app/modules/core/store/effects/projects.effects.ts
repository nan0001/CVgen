import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { ProjectsService } from '../../../core/services/projects.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ProjectsActions } from '../../../core/store/actions/projects.actions';
import { CvActions } from '../../../employees/store/actions/cv.actions';
import { Store } from '@ngrx/store';
import { selectProjectsCollection } from '../selectors/projects.selectors';
import { Router } from '@angular/router';

@Injectable()
export class ProjectEffects {
  public loadProjects$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CvActions.successLoading, ProjectsActions.loadProjects),
      concatLatestFrom(() => this.store.select(selectProjectsCollection)),
      switchMap(([action, projects]) => {
        if (
          !projects ||
          (action.type === ProjectsActions.loadProjects.type && action.update)
        ) {
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
        }
        return of(ProjectsActions.successLoading({ data: projects }));
      })
    );
  });

  public deleteProject$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProjectsActions.deleteProject),
      concatLatestFrom(() => this.store.select(selectProjectsCollection)),
      switchMap(([action, projects]) => {
        const project = projects?.find(val => val.id === action.id);

        if (project) {
          const delete$ = this.projectsService.deleteProject(action.id);
          const projectAction$ = delete$.pipe(
            map(() => {
              return ProjectsActions.loadProjects({ update: true });
            }),
            catchError((errorResponse: HttpErrorResponse) => {
              console.warn(errorResponse);
              return of(ProjectsActions.loadingFailure());
            })
          );

          return projectAction$;
        }

        return of(ProjectsActions["iDDoesn'tExist"]());
      })
    );
  });

  public updateProject$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProjectsActions.updateProject),
      concatLatestFrom(() => this.store.select(selectProjectsCollection)),
      switchMap(([action, projects]) => {
        const project = projects?.find(val => val.id === action.id);

        if (project) {
          const update$ = this.projectsService.updateProject(
            action.newValue,
            action.id
          );
          const projectAction$ = update$.pipe(
            map(() => {
              return ProjectsActions.loadProjects({ update: true });
            }),
            catchError((errorResponse: HttpErrorResponse) => {
              console.warn(errorResponse);
              return of(ProjectsActions.loadingFailure());
            })
          );

          return projectAction$;
        }

        return of(ProjectsActions["iDDoesn'tExist"]());
      })
    );
  });

  public addProject$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProjectsActions.addProject),
      concatLatestFrom(() => this.store.select(selectProjectsCollection)),
      switchMap(([action, projects]) => {
        const project = projects?.find(
          val => val.name === action.newValue.name
        );

        if (!project) {
          const add$ = this.projectsService.addProject(action.newValue);
          const projectAction$ = add$.pipe(
            map(id => {
              this.router.navigate(['projects', id]);
              return ProjectsActions.loadProjects({ update: true });
            }),
            catchError((errorResponse: HttpErrorResponse) => {
              console.warn(errorResponse);
              return of(ProjectsActions.loadingFailure());
            })
          );

          return projectAction$;
        }

        return of(ProjectsActions.projectWithSuchNameAlreadyExists());
      })
    );
  });

  constructor(
    private actions$: Actions,
    private projectsService: ProjectsService,
    private store: Store,
    private router: Router
  ) {}
}
