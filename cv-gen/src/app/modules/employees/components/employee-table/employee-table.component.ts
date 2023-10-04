import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeInterface } from '../../../core/models/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectEmployeeCollection } from '../../store/selectors/employee.selectors';
import { EmployeeActions } from '../../store/actions/employee.actions';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeTableComponent implements OnInit {
  public employees$!: Observable<EmployeeInterface[] | null>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  public ngOnInit(): void {
    this.employees$ = this.store.select(selectEmployeeCollection);
  }

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
