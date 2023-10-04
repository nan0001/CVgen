import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './projects.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';

const routes: Routes = [
  { path: ':id', component: ProjectDetailsComponent },
  { path: '', component: ProjectsComponent, pathMatch: 'full'  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
