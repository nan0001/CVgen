import { ChangeDetectionStrategy, Component,Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, take } from 'rxjs';
import { ProjectFormInterface, ProjectInterface } from '../../../core/models/project.model';
import { noConflictDates } from '../../../core/utils/date.validator';
import { EntitiesService } from '../../../core/services/entities.service';
import { filterOptions } from '../../../core/utils/filter-options.util';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectFormComponent implements OnInit{
  @Input() project!:Omit<ProjectInterface, "id">;
  @Output() sendFormData = new EventEmitter<Omit<ProjectInterface, "id">>;

  public infoForm!: FormGroup<ProjectFormInterface>;
  private options$ = this.entitiesService.getEntityList('skills');
  public optionsFiltered$: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >([]);

  constructor(private fb: FormBuilder,
    private entitiesService: EntitiesService){}

  public ngOnInit(): void {
    this.createControls();
    this.filterTechStack('');
  }

  public get internalName() {
    return this.infoForm.controls.internalName;
  }

  public get name() {
    return this.infoForm.controls.name;
  }

  public get dates() {
    return this.infoForm.controls.dates;
  }

  public get techStack() {
    return this.infoForm.controls.techStack;
  }

  public get domain() {
    return this.infoForm.controls.domain;
  }

  public get description() {
    return this.infoForm.controls.description;
  }

  public filterTechStack(query: string): void {
    filterOptions(query, this.options$, this.optionsFiltered$)
  }

  public onCancel(): void {
    this.infoForm.reset();
    this.infoForm.markAsUntouched();
    this.infoForm.markAsPristine();
  }

  public onSubmit(): void {
    if (this.infoForm.valid) {
      this.sendProjectData();
      return;
    }

    this.infoForm.markAllAsTouched();
  }

  private createControls(): void {
    this.infoForm = this.fb.nonNullable.group({
      internalName:[this.project.internalName, [
        Validators.required,
        Validators.minLength(2),
      ]],
      name: [this.project.name, [
        Validators.required,
        Validators.minLength(2)
      ]],
      dates: [{ start: this.project.start, end: this.project.end },
        [Validators.required, noConflictDates()]
      ],
      techStack: [this.project.techStack, [
        Validators.required]
      ],
      domain: [this.project.domain, [
        Validators.required,
        Validators.minLength(2),
      ]],
      description: [this.project.description, [
        Validators.required,
        Validators.minLength(5),
      ]]
    })
  }

  private sendProjectData(): void {
    const {dates, ...otherFields} = this.infoForm.getRawValue();
    const newValue: Omit<ProjectInterface, 'id'> = {
      ...otherFields,
      start: dates.start,
      end: dates.end
    }

    this.sendFormData.emit(newValue);
  }
}
