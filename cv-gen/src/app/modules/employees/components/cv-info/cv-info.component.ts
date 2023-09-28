import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EntitiesService } from '../../../core/services/entities.service';
import { CvFormInterface, CvInterface } from '../../../core/models/cv.models';
import { ProjectsService } from '../../../core/services/projects.service';
import { BehaviorSubject, Observable, take } from 'rxjs';
import {
  CvProjectFormInterface,
  ProjectInterface,
} from '../../../core/models/project.model';
import { SkillsInterface } from '../../../core/models/skills.model';
import { bothFieldsRequired } from '../../../core/utils/skill.validator';
import { noConflictDates } from '../../../core/utils/date.validator';

@Component({
  selector: 'app-cv-info',
  templateUrl: './cv-info.component.html',
  styleUrls: ['./cv-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvInfoComponent implements OnInit {
  @Input() cv!: CvInterface;
  @Input() cvProjects!: (ProjectInterface | null)[] | null;

  public infoForm!: FormGroup<CvFormInterface>;

  public skillsControl!: {
    name: string;
    control: FormArray<FormControl<SkillsInterface | null>>;
    itemName: string;
    options: Observable<string[] | null>;
  }[];
  private options$ = this.entitiesService.getEntityList('skills');
  public optionsFiltered$: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >([]);

  constructor(
    private fb: FormBuilder,
    private entitiesService: EntitiesService,
    private projectService: ProjectsService
  ) {}

  public ngOnInit(): void {
    this.createControls();
    this.filterOptions('');
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

  public filterOptions(query: string): void {
    this.options$.pipe(take(1)).subscribe(val => {
      if (val) {
        const filteredArray = val.filter(elem =>
          elem.toLowerCase().includes(query.toLowerCase())
        );
        this.optionsFiltered$.next(filteredArray);
        return;
      }
      this.optionsFiltered$.next([]);
    });
  }

  public addItem(array: FormArray<FormControl<SkillsInterface | null>>): void {
    array.push(this.getNewSkillControl(null));
  }

  public onSubmit(): void {
    console.log(this.infoForm);
  }

  public onCancel(): void {
    this.infoForm.reset();
    this.resetArray(this.skills, this.cv.skills);
    this.resetArray(this.langs, this.cv.langs);
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
    if (this.cvProjects) {
      return this.cvProjects.map(val => {
        const projectForm = this.fb.nonNullable.group({
          name: [
            val ? val.name : '',
            [Validators.required, Validators.minLength(2)],
          ],
          dates: [
            val
              ? { start: val.start, end: val.end }
              : { start: new Date(), end: new Date() },
            [Validators.required, noConflictDates()],
          ],
          techStack: [val ? val.techStack : [], [Validators.required]],
          responsibilities: [''],
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
      });
    }

    return [];
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
