import { Timestamp } from '@angular/fire/firestore';
import { FormControl } from '@angular/forms';

export interface FirestoreProjectInterface {
  id: string;
  name: string;
  internalName: string;
  start: Timestamp;
  end: Timestamp;
  domain: string;
  description: string;
  techStack: string[];
}

export interface ProjectInterface
  extends Omit<FirestoreProjectInterface, 'start' | 'end'> {
  start: Date;
  end: Date;
}

export interface ProjectFormInterface {
  name: FormControl<string>;
  internalName: FormControl<string>;
  domain: FormControl<string>;
  description: FormControl<string>;
  techStack: FormControl<string[]>;
  dates: FormControl<{
    start: Date;
    end: Date;
  }>;
}

export interface CvProjectFormInterface
  extends Omit<ProjectFormInterface, 'internalName'> {
  responsibilities: FormControl<string[]>;
}
