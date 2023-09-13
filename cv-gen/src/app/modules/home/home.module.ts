import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './components/main-page/main-page.component';
import { PrimeDesignModule } from '../prime-design/prime-design.module';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { NavigationComponent } from './components/navigation/navigation.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [MainPageComponent, HeaderComponent, NavigationComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    PrimeDesignModule,
    SharedModule,
    TranslateModule,
  ],
  exports: [MainPageComponent],
})
export class HomeModule {}
