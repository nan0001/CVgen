import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { PrimeDesignModule } from '../prime-design/prime-design.module';
import { ThemeSwitchComponent } from './components/theme-switch/theme-switch.component';

@NgModule({
  declarations: [FooterComponent, ThemeSwitchComponent],
  imports: [CommonModule, PrimeDesignModule],
  exports: [FooterComponent, ThemeSwitchComponent],
})
export class CoreModule {}
