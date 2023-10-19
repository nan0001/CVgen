import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProjectInterface } from '../../../core/models/project.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProjectsActions } from '../../../core/store/actions/projects.actions';
import { selectProjectById, selectProjectsLoading } from '../../../core/store/selectors/projects.selectors';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';

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
  public loading$ = this.store.select(selectProjectsLoading);

  constructor(
    private router: Router,
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

  public submitData(formValue: Omit<ProjectInterface, 'id'>, dialog: DialogComponent): void {
    dialog.showMessage();
    this.sendProjectData(formValue);
  }

  private sendProjectData(formValue: Omit<ProjectInterface, 'id'>): void {
    const actionToDispatch = this.id === 'new-project'
    ? ProjectsActions.addProject({newValue: formValue})
    : ProjectsActions.updateProject({newValue: formValue, id: this.id})

    this.store.dispatch(actionToDispatch)
  }
}
