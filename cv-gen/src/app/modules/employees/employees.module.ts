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
import { GetControlPipe } from './pipes/get-control.pipe';
import { StoreModule } from '@ngrx/store';
import * as fromCV from './store';
import { EffectsModule } from '@ngrx/effects';
import { CvEffects } from './store/cv.effects';

@NgModule({
  declarations: [
    EmployeesComponent,
    EmployeeTableComponent,
    EmployeeDetailsComponent,
    CvsComponent,
    CvListComponent,
    CvInfoComponent,
    EmployeeFormComponent,
    GetControlPipe,
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    PrimeDesignModule,
    SharedModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forFeature(fromCV.cvFeatureKey, fromCV.reducers),
    EffectsModule.forFeature([CvEffects]),
  ],
})
export class EmployeesModule {}
