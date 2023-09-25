import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntitiesComponent } from './entities.component';
import { EntityDetailsComponent } from './components/entity-details/entity-details.component';

const routes: Routes = [
  { path: ':id', component: EntityDetailsComponent },
  { path: '', component: EntitiesComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntitiesRoutingModule {}
