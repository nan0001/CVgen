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
import { Router } from '@angular/router';

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
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.employee$ = this.employeeService.getEmployeeById(this.id);
  }

  public navigateToList() {
    this.router.navigateByUrl('employees');
  }

  public submitData(formValue: Omit<EmployeeInterface, 'id' | 'cvsId'>): void {
    this.employeeService.updateEmployee(formValue, this.id);
    this.showMessage();
    this.employee$ = this.employeeService.getEmployeeById(this.id);
  }

  private showMessage(): void {
    this.showSaveMessage = true;

    setTimeout(() => {
      this.showSaveMessage = false;
      this.cdr.markForCheck();
    }, 2000);
  }
}
