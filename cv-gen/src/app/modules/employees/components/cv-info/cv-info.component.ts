import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  CvFormInterface,
  CvInterface,
  CvProjectFormInterface,
  CvProjectInterface,
} from '../../../core/models/cv.models';
import { BehaviorSubject, Observable } from 'rxjs';
import { SkillsInterface } from '../../../core/models/skills.model';
import { bothFieldsRequired } from '../../../core/utils/skill.validator';
import { noConflictDates } from '../../../core/utils/date.validator';
import { filterOptions } from '../../../core/utils/filter-options.util';
import { Store } from '@ngrx/store';
import {
  selectLangs,
  selectResponsibilities,
  selectSkills,
} from '../../../core/store/selectors/entities.selectors';
import { CvActions } from '../../store/actions/cv.actions';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';

@Component({
  selector: 'app-cv-info',
  templateUrl: './cv-info.component.html',
  styleUrls: ['./cv-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfirmationService],
})
export class CvInfoComponent implements OnInit, OnChanges {
  @Input() cv!: CvInterface | Omit<CvInterface, 'id'>;

  public infoForm!: FormGroup<CvFormInterface>;

  public skillsControl!: {
    name: string;
    control: FormArray<FormControl<SkillsInterface | null>>;
    itemName: string;
    options: Observable<string[] | null>;
  }[];
  private techOptions$ = this.store.select(selectSkills);
  private respOptions$ = this.store.select(selectResponsibilities);
  private langOptions$ = this.store.select(selectLangs);
  public techOptionsFiltered$: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >([]);
  public respOptionsFiltered$: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >([]);

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private confirmationService: ConfirmationService
  ) {}

  public ngOnInit(): void {
    this.createControls();
    this.filterTechStack('');
    this.filterResponsibilities('');
    this.skillsControl = [
      {
        name: 'skills',
        control: this.skills,
        itemName: 'skill',
        options: this.techOptions$,
      },
      {
        name: 'langs',
        control: this.langs,
        itemName: 'lang',
        options: this.langOptions$,
      },
    ];
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['cv']) {
      this.createControls();
    }
  }

  public get firstName(): FormControl<string> {
    return this.infoForm.controls.firstName;
  }

  public get lastName(): FormControl<string> {
    return this.infoForm.controls.lastName;
  }

  public get description(): FormControl<string> {
    return this.infoForm.controls.description;
  }

  public get skills(): FormArray<FormControl<SkillsInterface | null>> {
    return this.infoForm.controls.skills;
  }

  public get langs(): FormArray<FormControl<SkillsInterface | null>> {
    return this.infoForm.controls.langs;
  }

  public get projects(): FormArray<FormGroup<CvProjectFormInterface>> {
    return this.infoForm.controls.projects;
  }

  public onItemRemove(
    index: number,
    array: FormArray<FormControl<SkillsInterface | null>>
  ): void {
    array.removeAt(index);
  }

  public filterResponsibilities(query: string): void {
    filterOptions(query, this.respOptions$, this.respOptionsFiltered$);
  }

  public filterTechStack(query: string): void {
    filterOptions(query, this.techOptions$, this.techOptionsFiltered$);
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
      } as Omit<CvInterface, 'id' | 'employeeId' | 'name'>;

      const actionToDispatch =
        'id' in this.cv
          ? CvActions.updateCv({
              data: newValue,
              id: this.cv.id,
            })
          : CvActions.addCv({
              newValue: {
                ...newValue,
                name: this.cv.name,
                employeeId: this.cv.employeeId,
              },
            });

      this.store.dispatch(actionToDispatch);
    }

    this.infoForm.markAllAsTouched();
  }

  public onCancel(): void {
    this.infoForm.reset({
      firstName: this.cv.firstName,
      lastName: this.cv.lastName,
      description: this.cv.description,
    });
    this.resetArray(this.skills, this.cv.skills);
    this.resetArray(this.langs, this.cv.langs);
    this.resetProjects();
  }

  public addProject(): void {
    this.confirmationService.confirm({
      reject: () => {
        this.confirmationService.close();
      },
    });
  }

  public acceptProject(
    cd: ConfirmDialog,
    project: CvProjectInterface | null
  ): void {
    this.projects.push(this.createProjectGroup(project));
    cd.accept();
  }

  public deleteProject(event: Event, index: number): void {
    event.stopPropagation();
    this.projects.removeAt(index);
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

  private resetProjects(): void {
    this.projects.clear();
    this.getProjectsControlArray().forEach(control => {
      this.projects.push(control);
    });
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
      skills: this.fb.nonNullable.array(
        this.getInitialControlArray(this.cv.skills)
      ),
      langs: this.fb.nonNullable.array(
        this.getInitialControlArray(this.cv.langs)
      ),
      projects: this.fb.nonNullable.array(this.getProjectsControlArray()),
    });
  }

  private getProjectsControlArray(): FormGroup<CvProjectFormInterface>[] {
    return this.cv.projects.map(val => {
      return this.createProjectGroup(val);
    });
  }

  private createProjectGroup(
    val: CvProjectInterface | null
  ): FormGroup<CvProjectFormInterface> {
    const projectForm = this.fb.nonNullable.group({
      name: [
        val ? val.name : '',
        [Validators.required, Validators.minLength(2)],
      ],
      dates: [
        val
          ? { start: val.dates.start, end: val.dates.end }
          : { start: new Date(), end: new Date() },
        [Validators.required, noConflictDates()],
      ],
      techStack: [val ? val.techStack : [], [Validators.required]],
      responsibilities: [
        val ? val.responsibilities : [],
        [Validators.required],
      ],
      domain: [
        val ? val.domain : '',
        [Validators.required, Validators.minLength(2)],
      ],
      description: [
        val ? val.description : '',
        [Validators.required, Validators.minLength(2)],
      ],
    });

    return projectForm as FormGroup<CvProjectFormInterface>;
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
