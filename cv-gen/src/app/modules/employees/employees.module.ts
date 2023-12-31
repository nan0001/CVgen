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
import * as fromEmployeeModule from './store';
import { EffectsModule } from '@ngrx/effects';
import { CvEffects } from './store/effects/cv.effects';
import { EmployeeEffects } from './store/effects/employee.effects';
import { CvProjectsComponent } from './components/cv-projects/cv-projects.component';
import { CvTemplateComponent } from './components/cv-template/cv-template.component';
import { SkillLevelComponent } from './components/skill-level/skill-level.component';
import { SkillFormComponent } from './components/skill-form/skill-form.component';
import { CvProjectFormComponent } from './components/cv-project-form/cv-project-form.component';

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
    CvProjectsComponent,
    CvTemplateComponent,
    SkillLevelComponent,
    SkillFormComponent,
    CvProjectFormComponent,
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    PrimeDesignModule,
    SharedModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forFeature(
      fromEmployeeModule.moduleFeatureKey,
      fromEmployeeModule.reducers
    ),
    EffectsModule.forFeature([CvEffects, EmployeeEffects]),
  ],
})
export class EmployeesModule {}
