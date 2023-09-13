import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-crumbs',
  templateUrl: './crumbs.component.html',
  styleUrls: ['./crumbs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrumbsComponent implements OnInit, OnDestroy {
  public pathSegments: MenuItem[] = [];
  public home = { icon: 'pi pi-home', routerLink: '/' };
  private unsubscribeLocation!: () => void;

  constructor(private location: Location) {}

  public ngOnInit(): void {
    this.pathSegments = this.getPathArr();
    this.unsubscribeLocation = this.location.onUrlChange(() => {
      this.pathSegments = this.getPathArr();
    });
  }

  public ngOnDestroy(): void {
    this.unsubscribeLocation();
  }

  public getPathArr() {
    const arr = this.location.path().split('/').slice(1);
    const pathArr = arr.map((val, ind) => {
      return {
        label: val[0].toUpperCase() + val.slice(1),
        routerLink: '/' + arr.slice(0, ind + 1).join('/'),
      };
    });

    return pathArr;
  }
}
