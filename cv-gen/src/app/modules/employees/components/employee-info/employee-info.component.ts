import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { EmployeeInterface } from '../../../core/models/employee.model';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeInfoComponent implements OnInit {
  @Input() employee!: EmployeeInterface;
  public infoForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    email: [
      '',
      [Validators.required, Validators.minLength(2), Validators.email],
    ],
    department: ['', [Validators.required, Validators.minLength(2)]],
    line: ['', [Validators.required, Validators.minLength(2)]],
  });

  constructor(private fb: FormBuilder) {}

  public ngOnInit(): void {
    this.firstName.setValue(this.employee.firstName);
    this.lastName.setValue(this.employee.lastName);
    this.email.setValue(this.employee.email);
    this.department.setValue(this.employee.department);
    this.line.setValue(this.employee.line);
  }

  public get firstName(): FormControl<string | null> {
    return this.infoForm.controls.firstName;
  }

  public get lastName(): FormControl<string | null> {
    return this.infoForm.controls.lastName;
  }

  public get email(): FormControl<string | null> {
    return this.infoForm.controls.email;
  }

  public get department(): FormControl<string | null> {
    return this.infoForm.controls.department;
  }

  public get line(): FormControl<string | null> {
    return this.infoForm.controls.line;
  }

  public onSubmit(): void {
    console.log(this.infoForm);
  }
}
