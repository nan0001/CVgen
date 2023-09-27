import { Injectable } from '@angular/core';
import {
  Firestore,
  UpdateData,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { CvInterface } from '../models/cv.models';
import { Observable, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CvService {
  private cvsRef = collection(this.db, 'cvs');

  constructor(private db: Firestore) {}

  public getCvs(): Observable<CvInterface[]> {
    const cvs$ = collectionData(this.cvsRef, {
      idField: 'id',
    }) as Observable<CvInterface[]>;

    return cvs$;
  }

  public getCvById(id: string): Observable<CvInterface | null> {
    const promiseSnapshot = getDoc(doc(this.cvsRef, id));
    const cv$ = from(promiseSnapshot).pipe(
      map(docSnap => {
        const data = docSnap.data() as CvInterface | undefined;
        if (data) {
          return {
            ...data,
            id: docSnap.id,
          } as CvInterface;
        }
        return null;
      })
    );
    return cv$;
  }

  public addCv(newCv: Omit<CvInterface, 'id'>): Observable<string> {
    const docRef = addDoc(this.cvsRef, newCv);
    const id$ = from(docRef).pipe(map(val => val.id));
    return id$;
  }

  public updateCv(cv: Omit<CvInterface, 'id'>, id: string): void {
    updateDoc(doc(this.cvsRef, id), cv as UpdateData<Omit<CvInterface, 'id'>>);
  }

  public deleteCv(cvId: string): void {
    deleteDoc(doc(this.cvsRef, cvId));
  }
}
