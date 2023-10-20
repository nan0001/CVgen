import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { EmployeesService } from '../../../core/services/employees.service';
import { EmployeeActions } from '../actions/employee.actions';
import { Store } from '@ngrx/store';
import { selectEmployeeCollection } from '../selectors/employee.selectors';
import { FirestoreError } from '@angular/fire/firestore';

@Injectable()
export class EmployeeEffects {
  public loadEmployees$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EmployeeActions.loadEmployees),
      concatLatestFrom(() => this.store.select(selectEmployeeCollection)),
      switchMap(([action, employees]) => {
        if (!employees || action.update) {
          const employeeCollection$ = this.employeeService.getEmployees();

          const employeeAction$ = employeeCollection$.pipe(
            map(response => {
              return EmployeeActions.successLoading({ data: response });
            }),
            catchError((errorResponse: FirestoreError) => {
              console.warn(errorResponse);

              return of(EmployeeActions.loadingFailure());
            })
          );

          return employeeAction$;
        }

        return of(EmployeeActions.successLoading({ data: employees }));
      })
    );
  });

  public deleteEmployee$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EmployeeActions.deleteEmployee),
      concatLatestFrom(() => this.store.select(selectEmployeeCollection)),
      switchMap(([action, employees]) => {
        const employee = employees?.find(val => val.id === action.id);

        if (employee) {
          const delete$ = this.employeeService.deleteEmployee(action.id);

          const employeeAction$ = delete$.pipe(
            map(() => {
              return EmployeeActions.loadEmployees({ update: true });
            }),
            catchError((errorResponse: FirestoreError) => {
              console.warn(errorResponse);
              return of(EmployeeActions.loadingFailure());
            })
          );

          return employeeAction$;
        }

        return of(EmployeeActions["iDDoesn'tExist"]());
      })
    );
  });

  public updateEmployee$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EmployeeActions.updateEmployee),
      concatLatestFrom(() => this.store.select(selectEmployeeCollection)),
      switchMap(([action, employees]) => {
        const employee = employees?.find(val => val.id === action.id);

        if (employee) {
          const update$ = this.employeeService.updateEmployee(
            action.newValue,
            action.id
          );

          const employeeAction$ = update$.pipe(
            map(() => {
              return EmployeeActions.loadEmployees({ update: true });
            }),
            catchError((errorResponse: FirestoreError) => {
              console.warn(errorResponse);

              return of(EmployeeActions.loadingFailure());
            })
          );

          return employeeAction$;
        }

        return of(EmployeeActions["iDDoesn'tExist"]());
      })
    );
  });

  public updateEmplyeeCv$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EmployeeActions.updateCv),
      concatLatestFrom(() => this.store.select(selectEmployeeCollection)),
      switchMap(([action, employees]) => {
        const employee = employees?.find(val => val.id === action.employeeId);

        if (employee) {
          const newCvArray = action.addCv
            ? [...employee.cvsId, action.cvId]
            : employee.cvsId.filter(val => val !== action.cvId);

          const update$ = this.employeeService.updateEmployeeCv(
            newCvArray,
            action.employeeId
          );

          const employeeAction$ = update$.pipe(
            map(() => {
              return EmployeeActions.loadEmployees({ update: true });
            }),
            catchError((errorResponse: FirestoreError) => {
              console.warn(errorResponse);

              return of(EmployeeActions.loadingFailure());
            })
          );

          return employeeAction$;
        }

        return of(EmployeeActions["iDDoesn'tExist"]());
      })
    );
  });

  constructor(
    private actions$: Actions,
    private employeeService: EmployeesService,
    private store: Store
  ) {}
}
