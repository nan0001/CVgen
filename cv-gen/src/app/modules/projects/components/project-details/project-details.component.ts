import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { ProjectInterface } from '../../../core/models/project.model';
import { ProjectsService } from '../../../core/services/projects.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectDetailsComponent {
  @Input() id = '';

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
  public project$!: Observable<ProjectInterface | null> | Observable<Omit<ProjectInterface, "id">>;
  public showSaveMessage = false;

  constructor(
    private projectsService: ProjectsService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    this.project$ = this.id === 'new-project'
    ? this.emptyProject$.asObservable()
    : this.projectsService.getProjectById(this.id);
  }

  public deleteProject(): void {
    this.projectsService.deleteProject(this.id);
    this.navigateToList();
  }

  public navigateToList() {
    this.router.navigateByUrl('projects');
  }

  public submitData(formValue: Omit<ProjectInterface, 'id'>): void {
    this.sendProjectData(formValue);
    this.showMessage();
  }

  private sendProjectData(formValue: Omit<ProjectInterface, 'id'>): void {
    if (this.id === 'new-project'){
      this.projectsService.addProject(formValue).pipe(take(1)).subscribe((val) => {
        this.router.navigate(['projects', val])
      })
      return;
    }

    this.projectsService.updateProject(formValue, this.id);
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
