import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EmployeeActions } from './store/actions/employee.actions';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesComponent implements OnInit {
  constructor(private store: Store) {}

  public ngOnInit(): void {
    this.store.dispatch(EmployeeActions.loadEmployees({ update: false }));
  }
}
