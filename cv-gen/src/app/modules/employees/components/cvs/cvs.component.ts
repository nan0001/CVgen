import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { EmployeeInterface } from '../../../core/models/employee.model';
import { CvInterface } from '../../../core/models/cv.models';
import { CvService } from '../../../core/services/cv.service';
import { Observable, of } from 'rxjs';
import { ProjectsService } from '../../../core/services/projects.service';
import { ProjectInterface } from '../../../core/models/project.model';
import { Store } from '@ngrx/store';
import { CvActions } from '../../store/cv.actions';

@Component({
  selector: 'app-cvs',
  templateUrl: './cvs.component.html',
  styleUrls: ['./cvs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvsComponent implements OnInit {
  @Input() employee!: EmployeeInterface;

  public pickedCv$: Observable<CvInterface | null> = of(null);
  public projectsObservable$: Observable<(ProjectInterface | null)[]> = of([]);

  constructor(
    private cvService: CvService,
    private projectService: ProjectsService,
    private store: Store
  ) {}

  public ngOnInit(): void {
    this.store.dispatch(CvActions.loadCvs());
  }

  public setPickedCv(id: string): void {
    //TODO: load projects via store side effects and add responsibilities to interface
    this.pickedCv$ = this.cvService.getCvById(id);
    this.pickedCv$.subscribe(val => {
      if (val) {
        const projectIds = val.projects.map(proj => proj.id);
        this.projectsObservable$ =
          this.projectService.getArrayOfProjects(projectIds);
      }
    });
  }
}
