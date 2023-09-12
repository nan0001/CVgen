import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './components/main-page/main-page.component';
import { PrimeDesignModule } from '../prime-design/prime-design.module';

@NgModule({
  declarations: [MainPageComponent],
  imports: [CommonModule, PrimeDesignModule],
  exports: [MainPageComponent],
})
export class HomeModule {}
