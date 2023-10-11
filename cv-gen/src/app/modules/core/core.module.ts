import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { PrimeDesignModule } from '../prime-design/prime-design.module';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import * as fromCoreModule from './store';
import { EffectsModule } from '@ngrx/effects';
import { ProjectEffects } from './store/effects/projects.effects';
import { EntitiesEffects } from './store/effects/entities.effects';
import { AuthEffects } from './store/effects/auth.effects';

@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    PrimeDesignModule,
    TranslateModule,
    StoreModule.forFeature(
      fromCoreModule.moduleFeatureKey,
      fromCoreModule.reducers
    ),
    EffectsModule.forFeature([ProjectEffects, EntitiesEffects, AuthEffects]),
  ],
  exports: [FooterComponent],
})
export class CoreModule {}
