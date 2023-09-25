import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
} from '@angular/core';
import { EntitiesListsType } from '../../../core/models/entities.model';
import { Observable } from 'rxjs';
import { EntitiesService } from '../../../core/services/entities.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-entity-details',
  templateUrl: './entity-details.component.html',
  styleUrls: ['./entity-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntityDetailsComponent implements OnInit {
  @Input() id: EntitiesListsType | '' = '';

  public itemsList$!: Observable<string[] | null>;
  public newValueControl = new FormControl('');

  constructor(private entitiesService: EntitiesService) {}

  public ngOnInit(): void {
    this.updateList();
  }

  public updateList(): void {
    if (this.id) {
      this.itemsList$ = this.entitiesService.getEntityList(this.id);
    }
  }

  public addItem(): void {
    if (this.newValueControl.value && this.id) {
      this.entitiesService.addEntity(this.newValueControl.value, this.id);
      this.itemsList$ = this.entitiesService.getEntityList(this.id);
      this.newValueControl.reset();
    }
  }
}
