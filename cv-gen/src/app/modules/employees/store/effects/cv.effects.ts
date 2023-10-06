import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { CvService } from '../../../core/services/cv.service';
import { CvActions } from '../actions/cv.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { selectCvsCollection } from '../selectors/cv.selectors';
import { EmployeeActions } from '../actions/employee.actions';

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

  public deleteCv$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CvActions.deleteCv),
      concatLatestFrom(() => this.store.select(selectCvsCollection)),
      switchMap(([action, cvs]) => {
        const cv = cvs?.find(val => val.id === action.id);

        if (cv) {
          const delete$ = this.cvService.deleteCv(action.id);
          const cvAction$ = delete$.pipe(
            map(() => {
              return EmployeeActions.updateCv({
                cvId: action.id,
                employeeId: cv.employeeId,
                addCv: false,
              });
            }),
            catchError((errorResponse: HttpErrorResponse) => {
              console.warn(errorResponse);
              return of(CvActions.loadingFailure());
            })
          );

          return cvAction$;
        }

        return of(CvActions["iDDoesn'tExist"]());
      })
    );
  });

  public updateCv$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CvActions.updateCv),
      concatLatestFrom(() => this.store.select(selectCvsCollection)),
      switchMap(([action, cvs]) => {
        const cv = cvs?.find(val => val.id === action.id);

        if (cv) {
          const update$ = this.cvService.updateCv(action.data, action.id);
          const cvAction$ = update$.pipe(
            map(() => {
              return CvActions.loadCvs();
            }),
            catchError((errorResponse: HttpErrorResponse) => {
              console.warn(errorResponse);
              return of(CvActions.loadingFailure());
            })
          );

          return cvAction$;
        }

        return of(CvActions["iDDoesn'tExist"]());
      })
    );
  });

  public addCv$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CvActions.addCv),
      concatLatestFrom(() => this.store.select(selectCvsCollection)),
      switchMap(([action, cvs]) => {
        const cv = cvs?.find(val => val.name === action.newValue.name);

        if (!cv) {
          const add$ = this.cvService.addCv(action.newValue);
          const cvAction$ = add$.pipe(
            map(id => {
              return EmployeeActions.updateCv({
                cvId: id,
                employeeId: action.newValue.employeeId,
                addCv: true,
              });
            }),
            catchError((errorResponse: HttpErrorResponse) => {
              console.warn(errorResponse);
              return of(CvActions.loadingFailure());
            })
          );

          return cvAction$;
        }

        return of(CvActions.cvWithSuchNameAlreadyExists());
      })
    );
  });

  public updateCvList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EmployeeActions.updateCv),
      switchMap(() => {
        return of(CvActions.loadCvs());
      })
    );
  });

  constructor(
    private actions$: Actions,
    private cvService: CvService,
    private store: Store
  ) {}
}
