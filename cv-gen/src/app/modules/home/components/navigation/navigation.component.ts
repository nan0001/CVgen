import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LanguageService } from '../../../core/services/language.service';
import { MenuItem } from 'primeng/api';
import { Observable, combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent implements OnInit {
  public links!: Observable<MenuItem[]>;

  constructor(private langService: LanguageService) {}

  public ngOnInit(): void {
    this.setMenuItems();
  }

  private setMenuItems(): void {
    const employeeTranslation =
      this.langService.getTranslationObservable('NAV.employees');
    const projectsTranslation =
      this.langService.getTranslationObservable('NAV.projects');
    const entitiesTranslation =
      this.langService.getTranslationObservable('NAV.entities');

    this.links = combineLatest([
      employeeTranslation,
      projectsTranslation,
      entitiesTranslation,
    ]).pipe(
      map(translations => {
        return [
          {
            label: translations[0],
            icon: 'pi pi-users',
            routerLink: 'employees',
          },
          {
            label: translations[1],
            icon: 'pi pi-list',
            routerLink: 'projects',
          },
          {
            label: translations[2],
            icon: 'pi pi-inbox',
            routerLink: 'entities',
          },
        ];
      })
    );
  }
}
