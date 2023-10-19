import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CvInterface } from '../../../core/models/cv.models';
import { BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectLangs,
  selectSkills,
} from '../../../core/store/selectors/entities.selectors';
import { CvActions } from '../../store/actions/cv.actions';

@Component({
  selector: 'app-cv-info',
  templateUrl: './cv-info.component.html',
  styleUrls: ['./cv-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvInfoComponent implements OnInit, OnChanges {
  @Input() cv!: CvInterface | Omit<CvInterface, 'id'>;
  @Output() changePickedCvAfterAdding = new EventEmitter<
    Omit<CvInterface, 'id'>
  >();

  public resetForm$ = new BehaviorSubject(false);
  public markAsTouched$ = new BehaviorSubject(false);
  public infoForm!: FormGroup;
  public showSaveMessage = false;
  public message = '';
  public previewMode = false;
  public previewDisabled = false;
  public techOptions$ = this.store.select(selectSkills);
  public langOptions$ = this.store.select(selectLangs);

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.createControls();

    this.previewDisabled = !('id' in this.cv);
    this.message = 'id' in this.cv ? 'INFO.infoSaved' : 'INFO.newAdded';
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['cv']) {
      this.createControls();
    }
  }

  public get firstName(): FormControl<string> {
    return this.infoForm.controls['firstName'] as FormControl<string>;
  }

  public get lastName(): FormControl<string> {
    return this.infoForm.controls['lastName'] as FormControl<string>;
  }

  public get description(): FormControl<string> {
    return this.infoForm.controls['description'] as FormControl<string>;
  }

  public onSubmit(): void {
    if (this.infoForm.valid) {
      const formValue = this.infoForm.getRawValue();
      const newValue = {
        ...formValue,
      } as Omit<CvInterface, 'id' | 'employeeId' | 'name'>;

      if ('id' in this.cv) {
        this.store.dispatch(
          CvActions.updateCv({
            data: newValue,
            id: this.cv.id,
          })
        );
      } else {
        this.store.dispatch(
          CvActions.addCv({
            newValue: {
              ...newValue,
              name: this.cv.name,
              employeeId: this.cv.employeeId,
            },
          })
        );

        this.changePickedCvAfterAdding.emit({
          ...newValue,
          name: this.cv.name,
          employeeId: this.cv.employeeId,
        });
      }

      this.showMessage();
    }

    this.infoForm.markAllAsTouched();
    this.markAsTouched$.next(true);
  }

  public onCancel(): void {
    this.infoForm.reset({
      firstName: this.cv.firstName,
      lastName: this.cv.lastName,
      description: this.cv.description,
    });
    this.resetForm$.next(true);
  }

  public showMessage(): void {
    this.showSaveMessage = true;

    setTimeout(() => {
      this.showSaveMessage = false;
      this.cdr.markForCheck();
    }, 2000);
  }

  private createControls(): void {
    this.infoForm = this.fb.nonNullable.group({
      firstName: [
        this.cv.firstName,
        [Validators.required, Validators.minLength(2)],
      ],
      lastName: [
        this.cv.lastName,
        [Validators.required, Validators.minLength(2)],
      ],
      description: [
        this.cv.description,
        [Validators.required, Validators.minLength(2)],
      ],
    });
  }
}
