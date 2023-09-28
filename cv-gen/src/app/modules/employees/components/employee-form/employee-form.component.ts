import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';
import {
  EmployeeFormInterface,
  EmployeeInterface,
} from '../../../core/models/employee.model';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EntitiesService } from '../../../core/services/entities.service';
import { SkillsInterface } from '../../../core/models/skills.model';
import { bothFieldsRequired } from '../../../core/utils/skill.validator';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeFormComponent implements OnInit {
  @Input() employee!: EmployeeInterface;
  @Output() sendFormData = new EventEmitter<
    Omit<EmployeeInterface, 'id' | 'cvsId'>
  >();

  public infoForm!: FormGroup<EmployeeFormInterface>;
  public personalInfoControlNames = [
    'firstName',
    'lastName',
    'email',
    'department',
    'line',
  ];

  public skillsControl!: {
    name: string;
    control: FormArray<FormControl<SkillsInterface | null>>;
    itemName: string;
    options: Observable<string[] | null>;
  }[];

  constructor(
    private fb: FormBuilder,
    private entitiesService: EntitiesService
  ) {}

  public ngOnInit(): void {
    this.createControls();
    this.skillsControl = [
      {
        name: 'skills',
        control: this.skills,
        itemName: 'skill',
        options: this.entitiesService.getEntityList('skills'),
      },
      {
        name: 'langs',
        control: this.langs,
        itemName: 'lang',
        options: this.entitiesService.getEntityList('langs'),
      },
    ];
  }

  public get skills(): FormArray<FormControl<SkillsInterface | null>> {
    return this.infoForm.controls.skills;
  }

  public get langs(): FormArray<FormControl<SkillsInterface | null>> {
    return this.infoForm.controls.langs;
  }

  public onItemRemove(
    index: number,
    array: FormArray<FormControl<SkillsInterface | null>>
  ): void {
    array.removeAt(index);
  }

  public addItem(array: FormArray<FormControl<SkillsInterface | null>>): void {
    array.push(this.getNewSkillControl(null));
  }

  public onSubmit(): void {
    if (this.infoForm.valid) {
      const formValue = this.infoForm.getRawValue();
      const newValue = {
        ...formValue,
        skills: formValue.skills.filter(val => val !== null),
        langs: formValue.langs.filter(val => val !== null),
      } as Omit<EmployeeInterface, 'id' | 'cvsId'>;
      this.sendFormData.emit(newValue);
      return;
    }

    this.infoForm.markAllAsTouched();
  }

  public onCancel(): void {
    this.infoForm.reset();
    this.resetArray(this.skills, this.employee.skills);
    this.resetArray(this.langs, this.employee.langs);
  }

  private resetArray(
    formArray: FormArray<FormControl<SkillsInterface | null>>,
    initArray: SkillsInterface[]
  ): void {
    formArray.clear();
    this.getInitialControlArray(initArray).forEach(control => {
      formArray.push(control);
    });
  }

  private createControls(): void {
    this.infoForm = this.fb.nonNullable.group({
      firstName: [
        this.employee.firstName,
        [Validators.required, Validators.minLength(2)],
      ],
      lastName: [
        this.employee.lastName,
        [Validators.required, Validators.minLength(2)],
      ],
      email: [
        this.employee.email,
        [Validators.required, Validators.minLength(2), Validators.email],
      ],
      department: [
        this.employee.department,
        [Validators.required, Validators.minLength(2)],
      ],
      line: [
        this.employee.line,
        [Validators.required, Validators.minLength(2)],
      ],
      skills: this.fb.nonNullable.array(
        this.getInitialControlArray(this.employee.skills)
      ),
      langs: this.fb.nonNullable.array(
        this.getInitialControlArray(this.employee.langs)
      ),
    });
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
}
