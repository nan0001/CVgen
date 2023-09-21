import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectsTableComponent } from './components/projects-table/projects-table.component';
import { PrimeDesignModule } from '../prime-design/prime-design.module';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { ProjectInfoComponent } from './components/project-info/project-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectsTableComponent,
    ProjectDetailsComponent,
    ProjectInfoComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    TranslateModule,
    PrimeDesignModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ProjectsModule { }
