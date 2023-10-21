import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { EmployeeInterface } from '../../../core/models/employee.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { CvActions } from '../../store/actions/cv.actions';
import { CvInterface } from '../../../core/models/cv.models';
import {
  selectCvsArrayByEmployeeId,
  selectPickedCv,
} from '../../store/selectors/cv.selectors';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { nameExistsValidator } from '../../../core/utils/name-exists.async-validator';
import { FormControl, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-cvs',
  templateUrl: './cvs.component.html',
  styleUrls: ['./cvs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfirmationService],
})
export class CvsComponent implements OnInit {
  @Input() employee!: EmployeeInterface;

  public pickedCv$ = this.store.select(selectPickedCv);
  public cvsObservable$!: Observable<CvInterface[]>;
  public newCvNameControl!: FormControl<string | null>;

  constructor(
    private store: Store,
    private confirmationService: ConfirmationService
  ) {}

  public ngOnInit(): void {
    this.store.dispatch(CvActions.loadCvs());
    this.cvsObservable$ = this.store.select(
      selectCvsArrayByEmployeeId({ employeeId: this.employee.id })
    );
    this.newCvNameControl = new FormControl('', {
      validators: [Validators.required],
      asyncValidators: [nameExistsValidator(this.cvsObservable$)],
      updateOn: 'change',
    });
  }

  public setNewCv(name: string): void {
    const emptyCv: Omit<CvInterface, 'id'> = {
      name: name,
      firstName: this.employee.firstName,
      lastName: this.employee.lastName,
      description: '',
      employeeId: this.employee.id,
      projects: [],
      skills: this.employee.skills,
      langs: this.employee.langs,
    };

    this.store.dispatch(CvActions.setPickedCv({ cv: { id: '', ...emptyCv } }));
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
        this.setNewCv(
          this.newCvNameControl.value ? this.newCvNameControl.value : ''
        );
      },
      reject: () => {
        this.confirmationService.close();
      },
    });
  }
}
