import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { SkillsInterface } from './skills.model';
import { CvProjectFormInterface, ProjectInterface } from './project.model';

export interface CvProjectInterface {
  id: string;
  responsibilities: string[];
}

export interface CvInterface {
  name: string;
  firstName: string;
  lastName: string;
  description: string;
  id: string;
  employeeId: string;
  projects: CvProjectInterface[];
  skills: SkillsInterface[];
  langs: SkillsInterface[];
}

export interface CvFormInterface {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  description: FormControl<string>;
  skills: FormArray<FormControl<SkillsInterface | null>>;
  langs: FormArray<FormControl<SkillsInterface | null>>;
  projects: FormArray<FormGroup<CvProjectFormInterface>>;
}

export type CvProjectType = ProjectInterface & CvProjectInterface;

export interface CvWithProjects extends Omit<CvInterface, 'projects'> {
  projects: CvProjectType[];
}
