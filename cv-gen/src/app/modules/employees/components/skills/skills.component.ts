import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
} from '@angular/forms';
import { SkillsInterface } from '../../../core/models/skills.model';
import { bothFieldsRequired } from '../../helpers/skill.validator';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsComponent implements OnInit {
  @Input() formArrayName = '';
  @Input() itemName = '';
  @Input() optionsAvailable: string[] = [];
  @Input() initialItems: SkillsInterface[] = [];

  public form!: FormGroup;
  public formArray!: FormArray<FormControl<SkillsInterface | null>>;

  constructor(
    private rootFormGroup: FormGroupDirective,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.formArray = this.fb.array<FormControl<SkillsInterface | null>>(
      this.getInitialArray()
    );
    this.form = this.rootFormGroup.form;
    this.form.setControl(this.formArrayName, this.formArray);
  }

  public onItemRemove(index: number): void {
    this.formArray.removeAt(index);
  }

  public addItem(): void {
    this.formArray.push(this.getNewSkillControl(null));
  }

  public reset() {
    const initControls = this.getInitialArray();

    this.formArray.clear();
    for (const control of initControls) {
      this.formArray.push(control);
    }
    this.cdr.markForCheck();
  }

  private getNewSkillControl(
    val: SkillsInterface | null
  ): FormControl<SkillsInterface | null> {
    return this.fb.control(val, [bothFieldsRequired()]);
  }

  private getInitialArray(): FormControl<SkillsInterface | null>[] {
    return this.initialItems.map(val => {
      return this.getNewSkillControl(val);
    });
  }
}
