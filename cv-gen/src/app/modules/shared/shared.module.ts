import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LangSwitchComponent } from './components/lang-switch/lang-switch.component';
import { ThemeSwitchComponent } from './components/theme-switch/theme-switch.component';
import { PrimeDesignModule } from '../prime-design/prime-design.module';

@NgModule({
  declarations: [LangSwitchComponent, ThemeSwitchComponent],
  imports: [CommonModule, PrimeDesignModule],
  exports: [LangSwitchComponent, ThemeSwitchComponent],
})
export class SharedModule {}
