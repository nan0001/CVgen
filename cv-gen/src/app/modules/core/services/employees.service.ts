import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
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

  public addEmployee(employee: Omit<EmployeeInterface, 'id'>): void {
    addDoc(this.employeesRef, employee);
  }

  public deleteEmployee(employeeId: string): void {
    deleteDoc(doc(this.employeesRef, employeeId));
  }
}
