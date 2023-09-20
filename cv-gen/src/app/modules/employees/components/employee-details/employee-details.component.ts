import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
} from '@angular/core';
import { EmployeeInterface } from '../../../core/models/employee.model';
import { Observable } from 'rxjs';
import { EmployeesService } from '../../../core/services/employees.service';

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

  constructor(
    private employeeService: EmployeesService,
    private cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.employee$ = this.employeeService.getEmployeeById(this.id);
  }

  public onUpdateEmployee(id: string): void {
    this.employee$ = this.employeeService.getEmployeeById(id);
    this.showSaveMessage = true;

    setTimeout(() => {
      this.showSaveMessage = false;
      this.cdr.markForCheck();
    }, 2000);
  }
}
