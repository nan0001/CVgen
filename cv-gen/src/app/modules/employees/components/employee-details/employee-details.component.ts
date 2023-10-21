import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
} from '@angular/core';
import { EmployeeInterface } from '../../../core/models/employee.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { EmployeeActions } from '../../store/actions/employee.actions';
import {
  selectEmployeeById,
  selectEmployeeLoading,
} from '../../store/selectors/employee.selectors';
import { TabViewChangeEvent } from 'primeng/tabview';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeDetailsComponent implements OnInit {
  @Input() id = '';

  public employee$!: Observable<EmployeeInterface | null>;
  public loading$ = this.store.select(selectEmployeeLoading);
  public currentPageIndex = 0;

  constructor(
    private router: Router,
    private store: Store
  ) {}

  public ngOnInit(): void {
    this.store.dispatch(EmployeeActions.loadEmployees({ update: false }));
    this.employee$ = this.store.select(selectEmployeeById({ id: this.id }));
  }

  public navigateToList() {
    this.router.navigateByUrl('employees');
  }

  public changeActivePage(event: TabViewChangeEvent): void {
    this.currentPageIndex = event.index;
  }
}
