import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { CvInterface } from '../../../core/models/cv.models';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCvsArrayById } from '../../store/cv.selectors';

@Component({
  selector: 'app-cv-list',
  templateUrl: './cv-list.component.html',
  styleUrls: ['./cv-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvListComponent implements OnInit, OnDestroy {
  @Input() cvIds: string[] = [];
  @Output() setCvId = new EventEmitter<string>();

  public cvsObservable$!: Observable<CvInterface[]>;
  public subscription!: Subscription;
  public cvsArray: CvInterface[] = [];
  public filteredItems$ = new BehaviorSubject<CvInterface[]>([]);
  public filterString = '';

  constructor(private store: Store) {}

  public ngOnInit(): void {
    this.cvsObservable$ = this.store.select(
      selectCvsArrayById({ ids: this.cvIds })
    );

    this.subscription = this.cvsObservable$.subscribe(val => {
      this.cvsArray = val;
      this.filterItems();
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public removeCv(event: Event, item: string): void {
    event.stopPropagation();
    // remove cv via service
  }

  public filterItems(): void {
    const newArray = this.cvsArray.filter(val => {
      return val.name.toLowerCase().includes(this.filterString.toLowerCase());
    });
    this.filteredItems$.next(newArray);
  }

  public setPickedId(cvId: string): void {
    this.setCvId.emit(cvId);
  }
}
