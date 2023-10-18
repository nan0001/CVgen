import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
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

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeDetailsComponent implements OnInit {
  @Input() id = '';

  public employee$!: Observable<EmployeeInterface | null>;
  public showSaveMessage = false;
  public loading$ = this.store.select(selectEmployeeLoading);

  constructor(
    private cdr: ChangeDetectorRef,
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

  public showMessage(): void {
    this.showSaveMessage = true;

    setTimeout(() => {
      this.showSaveMessage = false;
      this.cdr.markForCheck();
    }, 2000);
  }
}
