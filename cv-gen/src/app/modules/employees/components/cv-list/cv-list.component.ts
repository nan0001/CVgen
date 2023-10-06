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
export class CvListComponent implements OnInit {
  @Input() employeeId = '';
  @Output() setCvId = new EventEmitter<{ id: string; name: string }>();

  public cvsObservable$!: Observable<CvInterface[]>;
  public cvsArray: CvInterface[] = [];
  public newCvName = '';

  constructor(
    private store: Store,
    private confirmationService: ConfirmationService
  ) {}

  public ngOnInit(): void {
    this.cvsObservable$ = this.store.select(
      selectCvsArrayByEmployeeId({ employeeId: this.employeeId })
    );
  }

  public removeCv(event: Event, id: string): void {
    event.stopPropagation();
    this.store.dispatch(CvActions.deleteCv({ id }));
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
