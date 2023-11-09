import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { CvInterface } from '../../../core/models/cv.models';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectCvsArrayByEmployeeId,
  selectPickedCv,
} from '../../store/selectors/cv.selectors';
import { CvActions } from '../../store/actions/cv.actions';
import { ResizeService } from '../../../core/services/resize.service';

@Component({
  selector: 'app-cv-list',
  templateUrl: './cv-list.component.html',
  styleUrls: ['./cv-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvListComponent implements OnInit {
  @Input() employeeId = '';
  @Output() openAddCvPopup = new EventEmitter();

  public cvsObservable$!: Observable<CvInterface[]>;
  public pickedCv$ = this.store.select(selectPickedCv);
  public sidebarVisible = false;
  public widowSizeMedium$ = this.resizeService.widowSizeMedium$;

  constructor(
    private store: Store,
    private resizeService: ResizeService
  ) {}

  public ngOnInit(): void {
    this.cvsObservable$ = this.store.select(
      selectCvsArrayByEmployeeId({ employeeId: this.employeeId })
    );
  }

  public removeCv(event: Event, id: string, isDeletedCvPicked: boolean): void {
    event.stopPropagation();
    this.store.dispatch(CvActions.deleteCv({ id }));

    if (isDeletedCvPicked) {
      this.changePickedCv(null);
    }
  }

  public changePickedCv(cv: CvInterface | null): void {
    this.store.dispatch(CvActions.setPickedCv({ cv }));
    this.sidebarVisible = false;
  }
}
