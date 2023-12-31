import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectProjectsCollection, selectProjectsLoading } from '../../../core/store/selectors/projects.selectors';
import { ProjectsActions } from '../../../core/store/actions/projects.actions';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-projects-table',
  templateUrl: './projects-table.component.html',
  styleUrls: ['./projects-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsTableComponent {
  public projects$ = this.store.select(selectProjectsCollection);
  public currentLang$ = this.langService.currentLang$;
  public loading$ = this.store.select(selectProjectsLoading);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store,
    private langService: LanguageService,
  ) {}

  public navigateToInfo(id: string): void {
    this.router.navigate([id], {
      relativeTo: this.route,
    });
  }

  public removeProject(event: Event, id: string): void {
    event.stopPropagation();
    this.store.dispatch(ProjectsActions.deleteProject({id}))
  }

}
