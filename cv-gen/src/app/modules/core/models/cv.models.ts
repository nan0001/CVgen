import { SkillsInterface } from './skills.model';

export interface CvProjectInterface {
  id: string;
  responsibilities: string[];
}

export interface CvInterface {
  firstName: string;
  lastName: string;
  description: string;
  id: string;
  employeeId: string;
  projects: CvProjectInterface[];
  skills: SkillsInterface[];
  langs: SkillsInterface[];
}
