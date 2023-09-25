import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntitiesListsType } from '../core/models/entities.model';

@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntitiesComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public navigateToEntitiesList(listName: EntitiesListsType): void {
    this.router.navigate([listName], {
      relativeTo: this.route,
    });
  }
}
