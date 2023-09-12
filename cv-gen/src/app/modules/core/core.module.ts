import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { PrimeDesignModule } from '../prime-design/prime-design.module';
import { ThemeSwitchComponent } from './components/theme-switch/theme-switch.component';
import { LangSwitchComponent } from './components/lang-switch/lang-switch.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [FooterComponent, ThemeSwitchComponent, LangSwitchComponent],
  imports: [CommonModule, PrimeDesignModule, TranslateModule],
  exports: [FooterComponent, ThemeSwitchComponent, LangSwitchComponent],
})
export class CoreModule {}
