import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  selectEmployeeCollection,
  selectEmployeeLoading,
} from '../../store/selectors/employee.selectors';
import { EmployeeActions } from '../../store/actions/employee.actions';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeTableComponent {
  public employees$ = this.store.select(selectEmployeeCollection);
  public loading$ = this.store.select(selectEmployeeLoading);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  public navigateToInfo(id: string): void {
    this.router.navigate([id], {
      relativeTo: this.route,
    });
  }

  public removeEmployee(event: Event, id: string): void {
    event.stopPropagation();
    this.store.dispatch(EmployeeActions.deleteEmployee({ id }));
  }
}
