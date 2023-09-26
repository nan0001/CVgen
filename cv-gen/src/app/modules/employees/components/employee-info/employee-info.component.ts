import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChildren,
  QueryList,
  Output,
  EventEmitter,
} from '@angular/core';
import { EmployeeInterface } from '../../../core/models/employee.model';
import { FormBuilder } from '@angular/forms';
import { EmployeesService } from '../../../core/services/employees.service';
import { SkillsComponent } from '../skills/skills.component';
import { Router } from '@angular/router';
import { EntitiesService } from '../../../core/services/entities.service';

@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeInfoComponent {
  @Input() employee!: EmployeeInterface;
  @Output() saveInfo = new EventEmitter<string>();

  @ViewChildren(SkillsComponent)
  private skillsComponents!: QueryList<SkillsComponent>;

  public infoForm = this.fb.nonNullable.group({});

  public skillsOptions$ = this.entitiesService.getEntityList('skills');
  public langsOptions$ = this.entitiesService.getEntityList('langs');

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeesService,
    private router: Router,
    private entitiesService: EntitiesService
  ) {}

  public onSubmit(): void {
    if (this.infoForm.valid) {
      this.employeeService.updateEmployee(
        this.infoForm.getRawValue() as Omit<EmployeeInterface, 'id' | 'cvsId'>,
        this.employee.id
      );

      this.saveInfo.emit(this.employee.id);

      return;
    }

    this.infoForm.markAllAsTouched();
  }

  public onCancel(): void {
    this.infoForm.reset();
    if (this.skillsComponents) {
      this.skillsComponents.forEach(val => {
        val.reset();
      });
    }
  }

  public navigateToList() {
    this.router.navigateByUrl('employees');
  }
}
