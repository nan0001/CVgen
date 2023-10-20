import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { EmployeeInterface } from '../../../core/models/employee.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { EmployeeActions } from '../../store/actions/employee.actions';
import {
  selectLangs,
  selectSkills,
} from '../../../core/store/selectors/entities.selectors';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeFormComponent implements OnInit {
  @Input() employee!: EmployeeInterface;
  @Output() sendFormData = new EventEmitter();

  public infoForm!: FormGroup;
  public personalInfoControlNames = [
    'firstName',
    'lastName',
    'email',
    'department',
    'line',
  ];
  public techOptions$ = this.store.select(selectSkills);
  public langOptions$ = this.store.select(selectLangs);
  public resetForm$ = new BehaviorSubject(false);
  public markAsTouched$ = new BehaviorSubject(false);

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {}

  public ngOnInit(): void {
    this.createControls();
  }

  public onSubmit(): void {
    if (this.infoForm.valid) {
      const formValue = this.infoForm.getRawValue();
      const newValue = {
        ...formValue,
      } as Omit<EmployeeInterface, 'id' | 'cvsId'>;

      this.store.dispatch(
        EmployeeActions.updateEmployee({ newValue, id: this.employee.id })
      );
      this.sendFormData.emit();

      return;
    }

    this.infoForm.markAllAsTouched();
    this.markAsTouched$.next(true);
  }

  public onCancel(): void {
    this.infoForm.reset({
      firstName: this.employee.firstName,
      lastName: this.employee.lastName,
      email: this.employee.email,
      department: this.employee.department,
      line: this.employee.line,
    });
    this.resetForm$.next(true);
  }

  private createControls(): void {
    this.infoForm = this.fb.nonNullable.group({
      firstName: [
        this.employee.firstName,
        [Validators.required, Validators.minLength(2)],
      ],
      lastName: [
        this.employee.lastName,
        [Validators.required, Validators.minLength(2)],
      ],
      email: [
        this.employee.email,
        [Validators.required, Validators.minLength(2), Validators.email],
      ],
      department: [
        this.employee.department,
        [Validators.required, Validators.minLength(2)],
      ],
      line: [
        this.employee.line,
        [Validators.required, Validators.minLength(2)],
      ],
    });
  }
}
