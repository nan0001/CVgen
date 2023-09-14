import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDoc,
} from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';
import { EmployeeInterface } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  private employeesRef = collection(this.db, 'employees');

  constructor(private db: Firestore) {}

  public getEmployees(): Observable<EmployeeInterface[]> {
    const employees$ = collectionData(this.employeesRef, {
      idField: 'id',
    }) as Observable<EmployeeInterface[]>;

    return employees$;
  }

  public getEmployeeById(id: string): Observable<EmployeeInterface | null> {
    const promiseSnapshot = getDoc(doc(this.employeesRef, id));
    const observable = from(promiseSnapshot).pipe(
      map(docSnap => {
        if (docSnap.data()) {
          return docSnap.data() as EmployeeInterface;
        }
        return null;
      })
    );
    return observable;
  }

  public addEmployee(employee: Omit<EmployeeInterface, 'id'>): void {
    addDoc(this.employeesRef, employee);
  }

  public deleteEmployee(employeeId: string): void {
    deleteDoc(doc(this.employeesRef, employeeId));
  }
}
