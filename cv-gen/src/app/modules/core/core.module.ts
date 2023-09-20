import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { PrimeDesignModule } from '../prime-design/prime-design.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [FooterComponent],
  imports: [CommonModule, PrimeDesignModule, TranslateModule],
  exports: [FooterComponent],
})
export class CoreModule {}
