import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { PrimeDesignModule } from '../prime-design/prime-design.module';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import * as fromProjects from './store';

@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    PrimeDesignModule,
    TranslateModule,
    StoreModule.forFeature(
      fromProjects.projectsFeatureKey,
      fromProjects.reducers
    ),
  ],
  exports: [FooterComponent],
})
export class CoreModule {}
