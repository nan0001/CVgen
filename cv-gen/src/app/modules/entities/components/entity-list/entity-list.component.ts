import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { EntitiesListsType } from '../../../core/models/entities.model';
import { Store } from '@ngrx/store';
import { EntitiesActions } from '../../../core/store/actions/entities.actions';
import { Observable } from 'rxjs';
import { selectEntitytList } from '../../../core/store/selectors/entities.selectors';

@Component({
  selector: 'app-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntityListComponent implements OnInit {
  @Input() id: EntitiesListsType | '' = '';

  public itemsList$!: Observable<string[] | null>;

  constructor(private store: Store) {}

  public ngOnInit(): void {
    if (this.id) {
      this.itemsList$ = this.store.select(selectEntitytList({ id: this.id }));
    }
  }

  public removeEntity(item: string): void {
    if (this.id) {
      this.store.dispatch(
        EntitiesActions.deleteItem({ list: this.id, item: item })
      );
    }
  }
}
