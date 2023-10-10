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

@Component({
  selector: 'app-crumbs',
  templateUrl: './crumbs.component.html',
  styleUrls: ['./crumbs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrumbsComponent implements OnInit, OnDestroy {
  public path$!: Observable<MenuItem[]>;
  public locationChange$ = new BehaviorSubject<string>('');
  public home = { icon: 'pi pi-home', routerLink: '/' };
  private unsubscribeLocation!: () => void;

  constructor(
    private location: Location,
    private langService: LanguageService
  ) {}

  public ngOnInit(): void {
    this.path$ = this.locationChange$.pipe(
      switchMap(() => {
        return this.getPathArr();
      })
    );

    this.unsubscribeLocation = this.location.onUrlChange(url => {
      this.locationChange$.next(url);
    });
  }

  public ngOnDestroy(): void {
    this.unsubscribeLocation();
  }

  public getPathArr(): Observable<MenuItem[]> {
    const arr = this.location.path().split('/').slice(1);
    const state = this.location.getState() as {
      [key: string]: string | number;
    };

    const name = state['name'] ? (state['name'] as string) : '';
    const pathArr = arr.map((val, ind) => {
      if (ind === arr.length - 1 && name) {
        return of({
          label: name,
          routerLink: '/' + arr.slice(0, ind + 1).join('/'),
        });
      }

      const translation$ = this.langService.getTranslationObservable(
        (arr[0] === 'entities' && ind === arr.length - 1 && ind !== 0
          ? 'ENTITIES.'
          : 'NAV.') + val
      );

      const translatedLabel$ = translation$.pipe(
        map(translated => {
          return {
            label: translated,
            routerLink: '/' + arr.slice(0, ind + 1).join('/'),
          };
        })
      );
      return translatedLabel$;
    });

    return combineLatest(pathArr);
  }
}
