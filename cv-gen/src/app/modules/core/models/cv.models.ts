import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { SkillsInterface } from './skills.model';
import { Timestamp } from '@angular/fire/firestore';
import { HasNameInterface } from './has-name.model';

export interface FirestoreCvProjectInterface {
  name: string;
  description: string;
  domain: string;
  dates: { start: Timestamp; end: Timestamp };
  techStack: string[];
  responsibilities: string[];
}

export interface CvProjectInterface
  extends Omit<FirestoreCvProjectInterface, 'dates'> {
  dates: { start: Date; end: Date };
}

export interface FirestoreCvInterface extends HasNameInterface {
  firstName: string;
  lastName: string;
  description: string;
  id: string;
  employeeId: string;
  projects: FirestoreCvProjectInterface[];
  skills: SkillsInterface[];
  langs: SkillsInterface[];
}

export interface CvInterface extends Omit<FirestoreCvInterface, 'projects'> {
  projects: CvProjectInterface[];
}

export interface CvProjectFormInterface {
  name: FormControl<string>;
  domain: FormControl<string>;
  description: FormControl<string>;
  techStack: FormControl<string[]>;
  responsibilities: FormControl<string[]>;
  dates: FormControl<{
    start: Date;
    end: Date;
  }>;
}

export interface CvFormInterface {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  description: FormControl<string>;
  skills: FormArray<FormControl<SkillsInterface | null>>;
  langs: FormArray<FormControl<SkillsInterface | null>>;
  projects: FormArray<FormGroup<CvProjectFormInterface>>;
}
