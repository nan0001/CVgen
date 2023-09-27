import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-cv-list',
  templateUrl: './cv-list.component.html',
  styleUrls: ['./cv-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvListComponent implements OnInit {
  @Input() cvsList: string[] | null = [];
  @Output() setCvId = new EventEmitter<string>();

  public filteredItems: string[] = [];
  public filterString = '';

  constructor() {}

  public ngOnInit(): void {
    this.filterItems();
  }

  public removeCv(event: Event, item: string): void {
    event.stopPropagation();
    // remove cv via service
  }

  public filterItems(): void {
    if (this.cvsList) {
      this.filteredItems = this.cvsList.filter(val => {
        return val.toLowerCase().includes(this.filterString.toLowerCase());
      });
    }
  }

  public setPickedId(cvId: string): void {
    this.setCvId.emit(cvId);
  }
}
