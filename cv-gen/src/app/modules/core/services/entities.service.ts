import { Injectable } from '@angular/core';
import { Observable, map, from } from 'rxjs';
import {
  Firestore,
  UpdateData,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { EntitiesInterface, EntitiesListsType } from '../models/entities.model';

@Injectable({
  providedIn: 'root',
})
export class EntitiesService {
  private entitiesRef = collection(this.db, 'entities');

  constructor(private db: Firestore) {}

  public getEntityList(id: EntitiesListsType): Observable<string[] | null> {
    const promiseSnapshot = getDoc(doc(this.entitiesRef, id));
    const entity$ = from(promiseSnapshot).pipe(
      map(docSnap => {
        const data = docSnap.data() as EntitiesInterface | undefined;
        if (data) {
          return data.values;
        }
        return null;
      })
    );
    return entity$;
  }

  public addEntity(newValue: string, id: EntitiesListsType): void {
    updateDoc(doc(this.entitiesRef, id), {
      values: arrayUnion(newValue),
    } as UpdateData<EntitiesInterface>);
  }

  public deleteEntity(removeValue: string, id: EntitiesListsType): void {
    updateDoc(doc(this.entitiesRef, id), {
      values: arrayRemove(removeValue),
    } as UpdateData<EntitiesInterface>);
  }
}
