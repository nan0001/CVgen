import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectInterface } from '../../../core/models/project.model';
import { ProjectsService } from '../../../core/services/projects.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-projects-table',
  templateUrl: './projects-table.component.html',
  styleUrls: ['./projects-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsTableComponent {
  public projects$!: Observable<ProjectInterface[]>;

  constructor(
    private projectService: ProjectsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.projects$ = this.projectService.getProjects();
  }

  public navigateToInfo(id: string): void {
    this.router.navigate([id], {
      relativeTo: this.route,
    });
  }

  public removeProject(event: Event, id: string): void {
    event.stopPropagation();
    this.projectService.deleteProject(id);
  }

}
