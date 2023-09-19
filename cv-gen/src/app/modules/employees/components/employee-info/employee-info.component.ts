import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { EmployeeInterface } from '../../../core/models/employee.model';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { EmployeesService } from '../../../core/services/employees.service';
import { SkillsComponent } from '../../../shared/components/skills/skills.component';

@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeInfoComponent implements OnInit {
  @Input() employee!: EmployeeInterface;

  @ViewChildren(SkillsComponent)
  private skillsComponents!: QueryList<SkillsComponent>;

  public infoForm = this.fb.nonNullable.group({
    firstName: ['Default', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    email: [
      '',
      [Validators.required, Validators.minLength(2), Validators.email],
    ],
    department: ['', [Validators.required, Validators.minLength(2)]],
    line: ['', [Validators.required, Validators.minLength(2)]],
  });

  public skillsOptions = ['Javascript', 'Angular']; //get from entities
  public langsOptions = ['English', 'Russian']; //get from entities

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeesService
  ) {}

  public ngOnInit(): void {
    this.addFormInitialValues();
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

  private addFormInitialValues(): void {
    this.firstName.setValue(this.employee.firstName);
    this.lastName.setValue(this.employee.lastName);
    this.email.setValue(this.employee.email);
    this.department.setValue(this.employee.department);
    this.line.setValue(this.employee.line);
  }

  public onSubmit(): void {
    if (this.infoForm.valid) {
      this.employeeService.updateEmployee(
        this.infoForm.getRawValue() as Omit<EmployeeInterface, 'id' | 'cvsId'>,
        this.employee.id
      );
      return;
    }

    this.infoForm.markAllAsTouched();
  }

  public onCancel(): void {
    if (this.skillsComponents) {
      this.skillsComponents.forEach(val => {
        val.reset();
      });
    }
  }
}
