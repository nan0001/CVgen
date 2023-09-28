import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { EmployeeInterface } from '../../../core/models/employee.model';
import { CvInterface } from '../../../core/models/cv.models';
import { CvService } from '../../../core/services/cv.service';
import { Observable, of } from 'rxjs';
import { ProjectsService } from '../../../core/services/projects.service';
import { ProjectInterface } from '../../../core/models/project.model';

@Component({
  selector: 'app-cvs',
  templateUrl: './cvs.component.html',
  styleUrls: ['./cvs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvsComponent {
  @Input() employee!: EmployeeInterface;

  public pickedCv$: Observable<CvInterface | null> = of(null);
  public projectsObservable$: Observable<(ProjectInterface | null)[]> = of([]);

  constructor(
    private cvService: CvService,
    private projectService: ProjectsService
  ) {}

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
