import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { EntitiesListsType } from '../../../core/models/entities.model';
import { Store } from '@ngrx/store';
import { EntitiesActions } from '../../../core/store/actions/entities.actions';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { selectEntitytList } from '../../../core/store/selectors/entities.selectors';

@Component({
  selector: 'app-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntityListComponent implements OnInit, OnDestroy {
  @Input() id: EntitiesListsType | '' = '';

  public filterString = '';
  public subscription!: Subscription;
  public itemsList$!: Observable<string[] | null>;
  private itemsList: string[] | null = [];
  public filteredItems$ = new BehaviorSubject<string[]>([]);

  constructor(private store: Store) {}

  public ngOnInit(): void {
    if (this.id) {
      this.itemsList$ = this.store.select(selectEntitytList({ id: this.id }));

      this.subscription = this.itemsList$.subscribe(val => {
        this.itemsList = val;
        this.filterItems();
      });
    }
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public removeEntity(item: string): void {
    if (this.id) {
      this.store.dispatch(
        EntitiesActions.deleteItem({ list: this.id, item: item })
      );
    }
  }

  public filterItems(): void {
    if (this.itemsList) {
      const newArray = this.itemsList.filter(val => {
        return val.toLowerCase().includes(this.filterString.toLowerCase());
      });

      this.filteredItems$.next(newArray);
    }
  }
}
