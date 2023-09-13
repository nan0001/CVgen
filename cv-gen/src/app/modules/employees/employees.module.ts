import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';
import { PrimeDesignModule } from '../prime-design/prime-design.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [EmployeesComponent],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    PrimeDesignModule,
    SharedModule,
  ],
})
export class EmployeesModule {}
