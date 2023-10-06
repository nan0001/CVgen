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
import { selectCvsArrayByEmployeeId } from '../../store/selectors/cv.selectors';
import { CvActions } from '../../store/actions/cv.actions';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-cv-list',
  templateUrl: './cv-list.component.html',
  styleUrls: ['./cv-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfirmationService],
})
export class CvListComponent implements OnInit, OnDestroy {
  @Input() employeeId = '';
  @Output() setCvId = new EventEmitter<{ id: string; name: string }>();

  public cvsObservable$!: Observable<CvInterface[]>;
  public subscription!: Subscription;
  public cvsArray: CvInterface[] = [];
  public filteredItems$ = new BehaviorSubject<CvInterface[]>([]);
  public filterString = '';
  public newCvName = '';

  constructor(
    private store: Store,
    private confirmationService: ConfirmationService
  ) {}

  public ngOnInit(): void {
    this.cvsObservable$ = this.store.select(
      selectCvsArrayByEmployeeId({ employeeId: this.employeeId })
    );

    this.subscription = this.cvsObservable$.subscribe(val => {
      this.cvsArray = val;
      this.filterItems();
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public removeCv(event: Event, id: string): void {
    event.stopPropagation();
    this.store.dispatch(CvActions.deleteCv({ id }));
  }

  public filterItems(): void {
    const newArray = this.cvsArray.filter(val => {
      return val.name.toLowerCase().includes(this.filterString.toLowerCase());
    });
    this.filteredItems$.next(newArray);
  }

  public setPickedId(cvId: string, cvName: string): void {
    this.setCvId.emit({ id: cvId, name: cvName });
  }

  public addCv(): void {
    this.confirmationService.confirm({
      accept: () => {
        this.setPickedId('new', this.newCvName);
      },
      reject: () => {
        this.confirmationService.close();
      },
    });
  }
}
