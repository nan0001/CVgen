import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { EntitiesListsType } from '../../../core/models/entities.model';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { EntitiesActions } from '../../../core/store/actions/entities.actions';
import { entityExistsValidator } from '../../../core/utils/entitity-exists';
import {
  selectEntitiesLoading,
  selectEntityList,
} from '../../../core/store/selectors/entities.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-entity-details',
  templateUrl: './entity-details.component.html',
  styleUrls: ['./entity-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntityDetailsComponent implements OnInit {
  @Input() id: EntitiesListsType = 'skills';

  public newValueControl!: FormControl<string | null>;
  public entityList$!: Observable<string[]>;
  public loading$ = this.store.select(selectEntitiesLoading);

  constructor(private store: Store) {}

  public ngOnInit(): void {
    this.entityList$ = this.store.select(selectEntityList({ id: this.id }));
    this.newValueControl = new FormControl('', {
      asyncValidators: [entityExistsValidator(this.entityList$)],
    });
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
