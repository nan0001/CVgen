import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectFormInterface, ProjectInterface } from '../../../core/models/project.model';
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
  public showSaveMessage = false;

  constructor(
    private projectsService: ProjectsService,
    private fb: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    this.project$ = this.projectsService.getProjectById(this.id);
  }

  public onCancel(): void {
    this.infoForm.reset();
    this.infoForm.markAsUntouched();
    this.infoForm.markAsPristine();
  }

  public onSubmit(): void {
    if (this.infoForm.valid) {
      const {dates, ...otherFields} = this.infoForm.getRawValue() as ProjectFormInterface;
      this.projectsService.updateProject(
        {
          ...otherFields,
          start: dates.start,
          end: dates.end
        },
        this.id
      );

      this.project$ = this.projectsService.getProjectById(this.id);
      this.showMessage();

      return;
    }

    this.infoForm.markAllAsTouched();
  }

  public showMessage(): void {
    this.showSaveMessage = true;

    setTimeout(() => {
      this.showSaveMessage = false;
      this.cdr.markForCheck();
    }, 2000);
  }

  public deleteProject(): void {
    this.projectsService.deleteProject(this.id);
    this.navigateToList();
  }

  public navigateToList() {
    this.router.navigateByUrl('projects');
  }
}
