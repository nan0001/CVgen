import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ProjectInterface } from '../../../core/models/project.model';
import { noConflictDates } from '../../../core/helpers/date.validator';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectInfoComponent {
  @Input() project!: ProjectInterface;

  public form!: FormGroup;
  public internalName!: FormControl<string | null>;
  public name!: FormControl<string | null>;
  public dates!: FormControl<Pick<ProjectInterface, 'start' | 'end'> | null>;
  public techStack!: FormControl<string[] | null>;
  public domain!: FormControl<string | null>;
  public description!: FormControl<string | null>;

  constructor(
    private rootFormGroup: FormGroupDirective,
    private fb: FormBuilder
  ) {}

  public ngOnInit(): void {
    this.form = this.rootFormGroup.form;
    this.createControls();
    this.setControls();
  }

  private createControls(): void {
    this.internalName = this.fb.nonNullable.control(this.project.internalName, [
      Validators.required,
      Validators.minLength(2),
    ]);
    this.name = this.fb.nonNullable.control(this.project.name, [
      Validators.required,
      Validators.minLength(2),
    ]);
    this.dates = this.fb.nonNullable.control({start: this.project.start, end: this.project.end}, [
      Validators.required,
      noConflictDates(),
    ]);
    this.techStack = this.fb.nonNullable.control(this.project.techStack, [
      // Validators.required,
      // Validators.minLength(2),
    ]);
    this.domain = this.fb.nonNullable.control(this.project.domain, [
      Validators.required,
      Validators.minLength(2),
    ]);
    this.description = this.fb.nonNullable.control(this.project.description, [
      Validators.required,
      Validators.minLength(2),
    ]);
  }

  private setControls(): void {
    this.form.setControl('internalName', this.internalName);
    this.form.setControl('name', this.name);
    this.form.setControl('dates', this.dates);
    this.form.setControl('techStack', this.techStack);
    this.form.setControl('domain', this.domain);
    this.form.setControl('description', this.description);
  }
}
