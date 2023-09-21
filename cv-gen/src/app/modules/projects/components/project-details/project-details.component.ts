import { ChangeDetectionStrategy, Component, Input, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectInterface } from '../../../core/models/project.model';
import { ProjectsService } from '../../../core/services/projects.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectDetailsComponent {
  @Input() id = '';

  public project$!: Observable<ProjectInterface | null>;
  public infoForm = this.fb.nonNullable.group({});

  constructor(
    private projectsService: ProjectsService,
    private fb: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.project$ = this.projectsService.getProjectById(this.id);
  }

  public onCancel(): void {
    this.infoForm.reset();
  }

  // public onSubmit(): void {
  //   if (this.infoForm.valid) {
  //     this.employeeService.updateEmployee(
  //       this.infoForm.getRawValue() as Omit<EmployeeInterface, 'id' | 'cvsId'>,
  //       this.employee.id
  //     );

  //     this.saveInfo.emit(this.employee.id);

  //     return;
  //   }

  //   this.infoForm.markAllAsTouched();
  // }

  public navigateToList() {
    this.router.navigateByUrl('projects');
  }
}
