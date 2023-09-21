import { Timestamp } from '@angular/fire/firestore';

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
