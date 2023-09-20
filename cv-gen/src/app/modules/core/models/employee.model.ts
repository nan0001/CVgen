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
