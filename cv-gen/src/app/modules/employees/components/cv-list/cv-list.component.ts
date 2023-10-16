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
import { ConfirmationService } from 'primeng/api';
import { FormControl, Validators } from '@angular/forms';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { nameExistsValidator } from '../../../core/utils/name-exists.async-validator';
import { CvActions } from '../../store/actions/cv.actions';
import { ResizeService } from '../../../core/services/resize.service';

@Component({
  selector: 'app-cv-list',
  templateUrl: './cv-list.component.html',
  styleUrls: ['./cv-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfirmationService],
})
export class CvListComponent implements OnInit {
  @Input() employeeId = '';
  @Input() selectedCv: CvInterface | null = null;
  @Output() setCvId = new EventEmitter<{ id: string; name: string }>();

  public cvsObservable$!: Observable<CvInterface[]>;
  public cvsArray: CvInterface[] = [];
  public newCvNameControl!: FormControl<string | null>;
  public sidebarVisible = false;
  public widowSizeMedium$ = this.resizeService.widowSizeMedium$;

  constructor(
    private store: Store,
    private confirmationService: ConfirmationService,
    private resizeService: ResizeService
  ) {}

  public ngOnInit(): void {
    this.cvsObservable$ = this.store.select(
      selectCvsArrayByEmployeeId({ employeeId: this.employeeId })
    );

    this.newCvNameControl = new FormControl('', {
      validators: [Validators.required],
      asyncValidators: [nameExistsValidator(this.cvsObservable$)],
      updateOn: 'change',
    });
  }

  public removeCv(event: Event, id: string): void {
    event.stopPropagation();
    this.store.dispatch(CvActions.deleteCv({ id }));
  }

  public setPickedId(cvId: string, cvName: string): void {
    this.setCvId.emit({ id: cvId, name: cvName });
  }

  public checkFormValidity(cd: ConfirmDialog): void {
    this.newCvNameControl.updateValueAndValidity();
    if (this.newCvNameControl.valid) {
      cd.accept();
    } else {
      this.newCvNameControl.markAsTouched();
    }
  }

  public addCv(): void {
    this.confirmationService.confirm({
      accept: () => {
        this.setPickedId(
          'new',
          this.newCvNameControl.value ? this.newCvNameControl.value : ''
        );
      },
      reject: () => {
        this.confirmationService.close();
      },
    });
  }
}
