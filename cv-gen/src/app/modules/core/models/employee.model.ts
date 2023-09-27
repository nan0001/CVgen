import { FormArray, FormControl } from '@angular/forms';
import { SkillsInterface } from './skills.model';

export interface EmployeeInterface {
  email: string;
  firstName: string;
  lastName: string;
  department: string;
  line: string;
  id: string;
  cvsId: string[];
  skills: SkillsInterface[];
  langs: SkillsInterface[];
}

export interface EmployeeFormInterface {
  email: FormControl<string>;
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  department: FormControl<string>;
  line: FormControl<string>;
  skills: FormArray<FormControl<SkillsInterface | null>>;
  langs: FormArray<FormControl<SkillsInterface | null>>;
}
