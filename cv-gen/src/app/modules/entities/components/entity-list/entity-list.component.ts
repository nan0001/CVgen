import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { EntitiesService } from '../../../core/services/entities.service';
import { EntitiesListsType } from '../../../core/models/entities.model';

@Component({
  selector: 'app-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntityListComponent implements OnInit {
  @Input() id: EntitiesListsType | '' = '';
  @Input() itemsList: string[] | null = [];

  @Output() removeItem = new EventEmitter();

  public filteredItems: string[] = [];
  public filterString = '';

  constructor(private entitiesService: EntitiesService) {}

  public ngOnInit(): void {
    this.filterItems();
  }

  public removeEntity(item: string): void {
    if (this.id) {
      this.entitiesService.deleteEntity(item, this.id);
      this.removeItem.emit();
    }
  }

  public filterItems(): void {
    if (this.itemsList) {
      this.filteredItems = this.itemsList.filter(val => {
        return val.toLowerCase().includes(this.filterString.toLowerCase());
      });
    }
  }
}
