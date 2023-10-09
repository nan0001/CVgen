import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProjectsActions } from '../core/store/actions/projects.actions';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent implements OnInit{
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store,
  ){}

  public ngOnInit(): void {
    this.store.dispatch(ProjectsActions.loadProjects({update: false}))
  }

  public addProject(): void {
    this.router.navigate(['new-project'], {
      relativeTo: this.route,
    });
  }
}
