import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
  OnDestroy,
  ChangeDetectorRef,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
} from '@angular/forms';
import { SkillsInterface } from '../../../core/models/skills.model';
import { Observable, Subscription } from 'rxjs';
import { bothFieldsRequired } from '../../../core/utils/skill.validator';

@Component({
  selector: 'app-skill-form',
  templateUrl: './skill-form.component.html',
  styleUrls: ['./skill-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillFormComponent implements OnInit, OnChanges, OnDestroy {
  @Input() arrayName = 'skills';
  @Input() initValue: SkillsInterface[] = [];
  @Input({ required: true }) options$!: Observable<string[]>;
  @Input({ required: true }) resetForm$!: Observable<boolean>;
  @Input({ required: true }) markAsTouched$!: Observable<boolean>;

  public parentForm!: FormGroup;
  public itemName = 'skill';
  public controlArray!: FormArray<FormControl<SkillsInterface | null>>;

  private resetSubscription!: Subscription;
  private markTouchedSubscription!: Subscription;

  constructor(
    private rootForm: FormGroupDirective,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.parentForm = this.rootForm.form;
    this.itemName = this.arrayName.slice(0, this.arrayName.length - 1);

    this.createControls();
    this.addFormSubscriptions();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['initValue'] && this.controlArray) {
      this.resetArray();
    }
  }

  public ngOnDestroy(): void {
    this.resetSubscription.unsubscribe();
    this.markTouchedSubscription.unsubscribe();
  }

  public addItem(): void {
    this.controlArray.push(this.getNewSkillControl(null));
  }

  private createControls(): void {
    this.controlArray = this.fb.nonNullable.array(
      this.getInitialControlArray(this.initValue)
    );
    this.parentForm.setControl(this.arrayName, this.controlArray);
  }

  private getNewSkillControl(
    val: SkillsInterface | null
  ): FormControl<SkillsInterface | null> {
    return this.fb.control(val, [bothFieldsRequired()]);
  }

  private getInitialControlArray(
    array: SkillsInterface[]
  ): FormControl<SkillsInterface | null>[] {
    return array.map(val => {
      return this.getNewSkillControl(val);
    });
  }

  private addFormSubscriptions(): void {
    this.resetSubscription = this.resetForm$.subscribe(val => {
      if (val) {
        this.resetArray();
        this.cdr.detectChanges();
      }
    });

    this.markTouchedSubscription = this.markAsTouched$.subscribe(val => {
      if (val) {
        this.controlArray.markAllAsTouched();
        this.cdr.detectChanges();
      }
    });
  }

  private resetArray(): void {
    this.controlArray.clear();
    this.getInitialControlArray(this.initValue).forEach(control => {
      this.controlArray.push(control);
    });
  }
}
