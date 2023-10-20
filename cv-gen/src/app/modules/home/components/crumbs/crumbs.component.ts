import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import {
  BehaviorSubject,
  map,
  of,
  Observable,
  combineLatest,
  switchMap,
} from 'rxjs';
import { LanguageService } from '../../../core/services/language.service';
import { Store } from '@ngrx/store';
import { selectEmployeeCrumbById } from '../../../employees/store/selectors/employee.selectors';
import { selectProjectCrumbById } from '../../../core/store/selectors/projects.selectors';

@Component({
  selector: 'app-crumbs',
  templateUrl: './crumbs.component.html',
  styleUrls: ['./crumbs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrumbsComponent implements OnInit, OnDestroy {
  public path$!: Observable<MenuItem[] | null>;
  public locationChange$ = new BehaviorSubject<string>('');
  public home = { icon: 'pi pi-home', routerLink: '/' };

  private unsubscribeLocation!: () => void;

  constructor(
    private location: Location,
    private langService: LanguageService,
    private store: Store
  ) {}

  public ngOnInit(): void {
    this.path$ = this.locationChange$.pipe(
      switchMap(() => {
        return this.getCrumbsArr();
      })
    );

    this.unsubscribeLocation = this.location.onUrlChange(url => {
      this.locationChange$.next(url);
    });
  }

  public ngOnDestroy(): void {
    this.unsubscribeLocation();
  }

  private getCrumbsArr(): Observable<MenuItem[] | null> {
    const splittedLocationPath = this.location.path().split('/').slice(1);

    if (splittedLocationPath.length === 0) {
      return of(null); //hide crumbs on main page
    }

    if (splittedLocationPath[0] === 'not-found') {
      return of([]); //display only home icon on not-found page
    }

    const crumbsArray$ = splittedLocationPath.map((val, ind) => {
      //labels for base pages (employees, entities, projects)
      if (ind === 0) {
        return this.getNavLabel(val);
      }

      //translated labels for entities (languages, skills, responsibilities)
      if (splittedLocationPath[0] === 'entities') {
        const link = '/' + splittedLocationPath.slice(0, ind + 1).join('/');
        return this.getEntitiesLabel(val, link);
      }

      //find name for employee or project in the store
      const link = '/' + splittedLocationPath.slice(0, ind + 1).join('/');

      return this.store.select(
        splittedLocationPath[0] === 'employees'
          ? selectEmployeeCrumbById({ id: val, link })
          : selectProjectCrumbById({ id: val, link })
      );
    });

    return combineLatest(crumbsArray$);
  }

  private getNavLabel(
    pathSegment: string
  ): Observable<{ label: string; routerLink: string }> {
    return this.langService.getTranslationObservable('NAV.' + pathSegment).pipe(
      map(translatedLabel => {
        return {
          label: translatedLabel,
          routerLink: '/' + pathSegment,
        };
      })
    );
  }

  private getEntitiesLabel(
    pathSegment: string,
    link: string
  ): Observable<{ label: string; routerLink: string }> {
    return this.langService
      .getTranslationObservable('ENTITIES.' + pathSegment)
      .pipe(
        map(translatedLabel => {
          return {
            label: translatedLabel,
            routerLink: link,
          };
        })
      );
  }
}
