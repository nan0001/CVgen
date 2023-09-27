import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChildren,
  QueryList,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EntitiesService } from '../../../core/services/entities.service';
import { CvInterface } from '../../../core/models/cv.models';
import { SkillsComponent } from '../skills/skills.component';
import { ProjectsService } from '../../../core/services/projects.service';
import { Observable } from 'rxjs';
import { ProjectInterface } from '../../../core/models/project.model';

@Component({
  selector: 'app-cv-info',
  templateUrl: './cv-info.component.html',
  styleUrls: ['./cv-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvInfoComponent implements OnInit {
  @Input() cv!: CvInterface;
  public cvForm = this.fb.nonNullable.group({});

  public firstName!: FormControl<string>;
  public lastName!: FormControl<string>;
  public description!: FormControl<string>;
  public projects!: FormArray<any>;

  public skillsOptions$ = this.entitiesService.getEntityList('skills');
  public langsOptions$ = this.entitiesService.getEntityList('langs');

  public projectsObservables: Observable<ProjectInterface | null>[] = [];

  @ViewChildren(SkillsComponent)
  private skillsComponents!: QueryList<SkillsComponent>;

  constructor(
    private fb: FormBuilder,
    private entitiesService: EntitiesService,
    private projectService: ProjectsService
  ) {}

  public ngOnInit(): void {
    this.firstName = this.fb.nonNullable.control(this.cv.firstName, [
      Validators.required,
      Validators.minLength(2),
    ]);
    this.lastName = this.fb.nonNullable.control(this.cv.lastName, [
      Validators.required,
      Validators.minLength(2),
    ]);
    this.description = this.fb.nonNullable.control(this.cv.description, [
      Validators.required,
      Validators.minLength(5),
    ]);
    this.projects = this.fb.nonNullable.array([]);

    this.cv.projects.forEach(val => {
      const group = this.fb.group({
        responsibilities: this.fb.nonNullable.control(val.responsibilities),
      });
      this.projects.push(group);
      const project = this.projectService.getProjectById(val.id);
      this.projectsObservables.push(project);
    });

    this.cvForm.setControl('firstName', this.firstName);
    this.cvForm.setControl('lastName', this.lastName);
    this.cvForm.setControl('description', this.description);
    this.cvForm.setControl('projects', this.projects);
  }

  public onSubmit(): void {
    console.log(this.cvForm);
  }

  public onCancel(): void {
    this.cvForm.reset();
    if (this.skillsComponents) {
      this.skillsComponents.forEach(val => {
        val.reset();
      });
    }
  }

  public getProjectGroup(index: number): FormGroup {
    return this.projects.controls[index] as FormGroup;
  }
}
