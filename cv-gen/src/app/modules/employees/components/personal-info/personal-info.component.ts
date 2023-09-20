import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { EmployeeInterface } from '../../../core/models/employee.model';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalInfoComponent implements OnInit {
  @Input() employee!: EmployeeInterface;

  public form!: FormGroup;
  public firstName!: FormControl<string | null>;
  public lastName!: FormControl<string | null>;
  public email!: FormControl<string | null>;
  public department!: FormControl<string | null>;
  public line!: FormControl<string | null>;

  constructor(
    private rootFormGroup: FormGroupDirective,
    private fb: FormBuilder
  ) {}

  public ngOnInit(): void {
    this.form = this.rootFormGroup.form;
    this.createControls();
    this.setControls();
  }

  private createControls(): void {
    this.firstName = this.fb.nonNullable.control(this.employee.firstName, [
      Validators.required,
      Validators.minLength(2),
    ]);
    this.lastName = this.fb.nonNullable.control(this.employee.lastName, [
      Validators.required,
      Validators.minLength(2),
    ]);
    this.email = this.fb.nonNullable.control(this.employee.email, [
      Validators.required,
      Validators.minLength(2),
      Validators.email,
    ]);
    this.department = this.fb.nonNullable.control(this.employee.department, [
      Validators.required,
      Validators.minLength(2),
    ]);
    this.line = this.fb.nonNullable.control(this.employee.line, [
      Validators.required,
      Validators.minLength(2),
    ]);
  }

  private setControls(): void {
    this.form.setControl('firstName', this.firstName);
    this.form.setControl('lastName', this.lastName);
    this.form.setControl('email', this.email);
    this.form.setControl('department', this.department);
    this.form.setControl('line', this.line);
  }
}
