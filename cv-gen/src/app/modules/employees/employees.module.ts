import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';
import { PrimeDesignModule } from '../prime-design/prime-design.module';
import { SharedModule } from '../shared/shared.module';
import { EmployeeTableComponent } from './components/employee-table/employee-table.component';
import { TranslateModule } from '@ngx-translate/core';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { EmployeeInfoComponent } from './components/employee-info/employee-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';

@NgModule({
  declarations: [
    EmployeesComponent,
    EmployeeTableComponent,
    EmployeeDetailsComponent,
    EmployeeInfoComponent,
    PersonalInfoComponent,
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    PrimeDesignModule,
    SharedModule,
    TranslateModule,
    ReactiveFormsModule,
  ],
})
export class EmployeesModule {}
