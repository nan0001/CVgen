import {
  ChangeDetectionStrategy,
  Component,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { selectProjectsCollection } from '../../../core/store/selectors/projects.selectors';
import { CvProjectInterface } from '../../../core/models/cv.models';
import { ProjectInterface } from '../../../core/models/project.model';
import { ProjectsActions } from '../../../core/store/actions/projects.actions';

@Component({
  selector: 'app-cv-projects',
  templateUrl: './cv-projects.component.html',
  styleUrls: ['./cv-projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvProjectsComponent implements OnInit {
  @Output() pickProject = new EventEmitter<CvProjectInterface>();
  public projects$ = this.store.select(selectProjectsCollection);

  constructor(private store: Store) {}

  public ngOnInit(): void {
    this.store.dispatch(ProjectsActions.loadProjects({ update: false }));
  }

  public projectPicked(project: ProjectInterface): void {
    const formattedObject: CvProjectInterface = {
      ...project,
      dates: {
        start: project.start,
        end: project.end,
      },
      responsibilities: [],
    };
    this.pickProject.emit(formattedObject);
  }
}
