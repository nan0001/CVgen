import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntitiesRoutingModule } from './entities-routing.module';
import { EntitiesComponent } from './entities.component';
import { TranslateModule } from '@ngx-translate/core';
import { PrimeDesignModule } from '../prime-design/prime-design.module';
import { EntityListComponent } from './components/entity-list/entity-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EntityDetailsComponent } from './components/entity-details/entity-details.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    EntitiesComponent,
    EntityListComponent,
    EntityDetailsComponent,
  ],
  imports: [
    CommonModule,
    EntitiesRoutingModule,
    TranslateModule,
    PrimeDesignModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
})
export class EntitiesModule {}
