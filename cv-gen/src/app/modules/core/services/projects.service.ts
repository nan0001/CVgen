import { Injectable } from '@angular/core';
import { Observable, map, from } from 'rxjs';
import {
  Firestore,
  Timestamp,
  UpdateData,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from '@angular/fire/firestore';
import {
  FirestoreProjectInterface,
  ProjectInterface,
} from '../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private projectsRef = collection(this.db, 'projects');

  constructor(private db: Firestore) {}

  public getProjects(): Observable<ProjectInterface[]> {
    const response$ = collectionData(this.projectsRef, {
      idField: 'id',
    }) as Observable<FirestoreProjectInterface[]>;

    const projects$: Observable<ProjectInterface[]> = response$.pipe(
      map(val => {
        return val.map(project => {
          return {
            ...project,
            start: project.start.toDate(),
            end: project.end.toDate(),
          };
        });
      })
    );

    return projects$;
  }

  public getProjectById(id: string): Observable<ProjectInterface | null> {
    const promiseSnapshot = getDoc(doc(this.projectsRef, id));
    const project$ = from(promiseSnapshot).pipe(
      map(docSnap => {
        const data = docSnap.data() as FirestoreProjectInterface | undefined;
        if (data) {
          return {
            ...data,
            id: docSnap.id,
            start: data.start.toDate(),
            end: data.end.toDate(),
          } as ProjectInterface;
        }
        return null;
      })
    );
    return project$;
  }

  public addProject(project: Omit<ProjectInterface, 'id'>): void {
    addDoc(this.projectsRef, project);
  }

  public updateProject(
    project: Omit<ProjectInterface, 'id'>,
    id: string
  ): void {
    updateDoc(doc(this.projectsRef, id), {
      ...project,
      start: Timestamp.fromDate(project.start),
      end: Timestamp.fromDate(project.end),
    } as UpdateData<Omit<FirestoreProjectInterface, 'id'>>);
  }

  public deleteProject(projectId: string): void {
    deleteDoc(doc(this.projectsRef, projectId));
  }
}
