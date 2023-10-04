import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
} from '@angular/core';
import { EntitiesListsType } from '../../../core/models/entities.model';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { EntitiesActions } from '../../../core/store/actions/entities.actions';

@Component({
  selector: 'app-entity-details',
  templateUrl: './entity-details.component.html',
  styleUrls: ['./entity-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntityDetailsComponent implements OnInit {
  @Input() id: EntitiesListsType = 'skills';

  public newValueControl = new FormControl('');

  constructor(private store: Store) {}

  public ngOnInit(): void {
    this.store.dispatch(EntitiesActions.loadEntities());
  }

  public addItem(): void {
    if (this.newValueControl.value && this.id) {
      this.store.dispatch(
        EntitiesActions.addItem({
          list: this.id,
          item: this.newValueControl.value,
        })
      );
      this.newValueControl.reset();
    }
  }
}
