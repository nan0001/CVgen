import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { EmployeesService } from '../../../core/services/employees.service';
import { EmployeeActions } from '../actions/employee.actions';
import { Store } from '@ngrx/store';
import { selectEmployeeCollection } from '../selectors/employee.selectors';

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
            catchError((errorResponse: HttpErrorResponse) => {
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
            catchError((errorResponse: HttpErrorResponse) => {
              console.warn(errorResponse);
              return of(EmployeeActions.loadingFailure());
            })
          );

          return employeeAction$;
        }

        return of(EmployeeActions.loadEmployees({ update: false }));
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
            catchError((errorResponse: HttpErrorResponse) => {
              console.warn(errorResponse);
              return of(EmployeeActions.loadingFailure());
            })
          );

          return employeeAction$;
        }

        return of(EmployeeActions.loadEmployees({ update: false }));
      })
    );
  });

  constructor(
    private actions$: Actions,
    private employeeService: EmployeesService,
    private store: Store
  ) {}
}
