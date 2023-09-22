import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { BehaviorSubject, Observable, take, tap } from 'rxjs';
import { FirestoreProjectInterface, ProjectFormInterface, ProjectInterface } from '../../../core/models/project.model';
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

  public project$!: Observable<ProjectInterface | null> | Observable<Omit<ProjectInterface, "id">>;
  public infoForm = this.fb.nonNullable.group({});
  public showSaveMessage = false;
  public emptyProject: Omit<ProjectInterface, 'id'> = {
    name: '',
    internalName: '',
    start: new Date(),
    end: new Date(),
    domain: '',
    description: '',
    techStack: [],
  }
  public emptyProject$ = new BehaviorSubject(this.emptyProject);

  constructor(
    private projectsService: ProjectsService,
    private fb: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    this.project$ = this.id === 'new-project'? this.emptyProject$.asObservable() : this.projectsService.getProjectById(this.id);
  }

  public onCancel(): void {
    this.infoForm.reset();
    this.infoForm.markAsUntouched();
    this.infoForm.markAsPristine();
  }

  public onSubmit(): void {
    if (this.infoForm.valid) {
      this.showMessage();
      this.sendProjectData();
      return;
    }

    this.infoForm.markAllAsTouched();
    Object.keys(this.infoForm.controls).forEach((key) => {
      this.infoForm.get(key)?.updateValueAndValidity();
    })
  }

  public deleteProject(): void {
    this.projectsService.deleteProject(this.id);
    this.navigateToList();
  }

  public navigateToList() {
    this.router.navigateByUrl('projects');
  }

  private sendProjectData(): void {
    const {dates, ...otherFields} = this.infoForm.getRawValue() as ProjectFormInterface;
    const newValue: Omit<ProjectInterface, 'id'> = {
      ...otherFields,
      start: dates.start,
      end: dates.end
    }

    if (this.id === 'new-project'){
      this.projectsService.addProject(newValue).pipe(take(1)).subscribe((val) => {
        this.router.navigate(['projects', val])
      })
      return;
    }

    this.projectsService.updateProject(newValue, this.id);
    this.project$ = this.projectsService.getProjectById(this.id);
  }

  private showMessage(): void {
    this.showSaveMessage = true;

    setTimeout(() => {
      this.showSaveMessage = false;
      this.cdr.markForCheck();
    }, 2000);
  }
}
