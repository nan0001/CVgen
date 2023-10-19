import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import {
  CvProjectFormInterface,
  CvProjectInterface,
} from '../../../core/models/cv.models';
import { noConflictDates } from '../../../core/utils/date.validator';
import { filterOptions } from '../../../core/utils/filter-options.util';
import { Store } from '@ngrx/store';
import {
  selectResponsibilities,
  selectSkills,
} from '../../../core/store/selectors/entities.selectors';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectFormComponent implements OnInit, OnChanges, OnDestroy {
  @Input() initProjects: CvProjectInterface[] = [];
  @Input({ required: true }) resetForm$!: Observable<boolean>;
  @Input({ required: true }) markAsTouched$!: Observable<boolean>;

  public parentForm!: FormGroup;
  public techOptionsFiltered$: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >([]);
  public respOptionsFiltered$: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >([]);
  public projectsArray!: FormArray<FormGroup<CvProjectFormInterface>>;

  private techOptions$ = this.store.select(selectSkills);
  private respOptions$ = this.store.select(selectResponsibilities);
  private resetSubscription!: Subscription;
  private markTouchedSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private rootForm: FormGroupDirective,
    private cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.parentForm = this.rootForm.form;
    this.projectsArray = this.fb.nonNullable.array(
      this.getProjectsControlArray()
    );

    this.parentForm.setControl('projects', this.projectsArray);

    this.filterTechStack('');
    this.filterResponsibilities('');
    this.addFormSubscriptions();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['initProjects'] && this.projectsArray) {
      this.resetProjects();
    }
  }

  public ngOnDestroy(): void {
    this.resetSubscription.unsubscribe();
    this.markTouchedSubscription.unsubscribe();
  }

  public filterResponsibilities(query: string): void {
    filterOptions(query, this.respOptions$, this.respOptionsFiltered$);
  }

  public filterTechStack(query: string): void {
    filterOptions(query, this.techOptions$, this.techOptionsFiltered$);
  }

  public addProject(project: CvProjectInterface | null): void {
    this.projectsArray.push(this.createProjectGroup(project));
  }

  public deleteProject(event: Event, index: number): void {
    event.stopPropagation();
    this.projectsArray.removeAt(index);
  }

  private getProjectsControlArray(): FormGroup<CvProjectFormInterface>[] {
    return this.initProjects.map(val => {
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

  private resetProjects(): void {
    this.projectsArray.clear();
    this.initProjects.forEach(val => this.addProject(val));
  }

  private addFormSubscriptions(): void {
    this.resetSubscription = this.resetForm$.subscribe(val => {
      if (val) {
        this.resetProjects();
        this.cdr.detectChanges();
      }
    });

    this.markTouchedSubscription = this.markAsTouched$.subscribe(val => {
      if (val) {
        this.projectsArray.markAllAsTouched();
        this.cdr.detectChanges();
      }
    });
  }
}
