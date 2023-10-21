import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntitiesListsType } from '../core/models/entities.model';
import { ResizeService } from '../core/services/resize.service';

@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntitiesComponent {
  public pages: { label: EntitiesListsType; icon: string }[] = [
    {
      label: 'langs',
      icon: 'pi pi-language',
    },
    {
      label: 'responsibilities',
      icon: 'pi pi-sitemap',
    },
    {
      label: 'skills',
      icon: 'pi pi-wrench',
    },
  ];

  public responsiveOptions = [
    {
      breakpoint: '576px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  public widowSizeMobile$ = this.resizeService.widowSizeMobile$;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private resizeService: ResizeService
  ) {}

  public navigateToEntitiesList(listName: EntitiesListsType): void {
    this.router.navigate([listName], {
      relativeTo: this.route,
    });
  }
}
