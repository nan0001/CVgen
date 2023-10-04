import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EntitiesActions } from '../../../core/store/actions/entities.actions';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent implements OnInit {
  constructor(private store: Store) {}

  public ngOnInit(): void {
    this.store.dispatch(EntitiesActions.loadEntities());
  }
}
