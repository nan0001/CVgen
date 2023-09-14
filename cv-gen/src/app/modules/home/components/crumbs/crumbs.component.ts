import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-crumbs',
  templateUrl: './crumbs.component.html',
  styleUrls: ['./crumbs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrumbsComponent implements OnInit, OnDestroy {
  public pathSegments$ = new BehaviorSubject<MenuItem[]>([]);
  public home = { icon: 'pi pi-home', routerLink: '/' };
  private unsubscribeLocation!: () => void;

  constructor(
    private location: Location,
    private translateService: TranslateService
  ) {}

  public ngOnInit(): void {
    this.pathSegments$.next(this.getPathArr());
    this.unsubscribeLocation = this.location.onUrlChange(() => {
      this.pathSegments$.next(this.getPathArr());
    });
  }

  public ngOnDestroy(): void {
    this.unsubscribeLocation();
  }

  public getPathArr(): MenuItem[] {
    const arr = this.location.path().split('/').slice(1);
    const pathArr = arr.map((val, ind) => {
      return {
        label: val[0].toUpperCase() + val.slice(1),
        routerLink: '/' + arr.slice(0, ind + 1).join('/'),
      };
    });

    // console.log(this.translateService.get(`${arr[0].toUpperCase()}.title`));

    return pathArr;
  }
}
