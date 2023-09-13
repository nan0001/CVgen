import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LangSwitchComponent } from './components/lang-switch/lang-switch.component';
import { ThemeSwitchComponent } from './components/theme-switch/theme-switch.component';
import { PrimeDesignModule } from '../prime-design/prime-design.module';
import { CrumbsComponent } from './components/crumbs/crumbs.component';

@NgModule({
  declarations: [LangSwitchComponent, ThemeSwitchComponent, CrumbsComponent],
  imports: [CommonModule, PrimeDesignModule],
  exports: [LangSwitchComponent, ThemeSwitchComponent, CrumbsComponent],
})
export class SharedModule {}
