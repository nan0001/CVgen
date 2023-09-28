import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';
import { PrimeDesignModule } from '../prime-design/prime-design.module';
import { SharedModule } from '../shared/shared.module';
import { EmployeeTableComponent } from './components/employee-table/employee-table.component';
import { TranslateModule } from '@ngx-translate/core';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CvsComponent } from './components/cvs/cvs.component';
import { CvListComponent } from './components/cv-list/cv-list.component';
import { CvInfoComponent } from './components/cv-info/cv-info.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';

@NgModule({
  declarations: [
    EmployeesComponent,
    EmployeeTableComponent,
    EmployeeDetailsComponent,
    CvsComponent,
    CvListComponent,
    CvInfoComponent,
    EmployeeFormComponent,
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    PrimeDesignModule,
    SharedModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class EmployeesModule {}
