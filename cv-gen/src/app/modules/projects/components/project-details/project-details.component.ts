import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { ProjectInterface } from '../../../core/models/project.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProjectsActions } from '../../../core/store/actions/projects.actions';
import { selectProjectById } from '../../../core/store/selectors/projects.selectors';

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
    private router: Router,
    private cdr: ChangeDetectorRef,
    private store: Store
  ) {}

  public ngOnInit(): void {
    this.store.dispatch(ProjectsActions.loadProjects({update: false}));

    this.project$ = this.id === 'new-project'
    ? this.emptyProject$.asObservable()
    : this.store.select(selectProjectById({id: this.id}))
  }

  public deleteProject(): void {
    this.store.dispatch(ProjectsActions.deleteProject({id: this.id}))
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
    const actionToDispatch = this.id === 'new-project'
    ? ProjectsActions.addProject({newValue: formValue})
    : ProjectsActions.updateProject({newValue: formValue, id: this.id})

    this.store.dispatch(actionToDispatch)
  }

  private showMessage(): void {
    this.showSaveMessage = true;

    setTimeout(() => {
      this.showSaveMessage = false;
      this.cdr.markForCheck();
    }, 2000);
  }
}
