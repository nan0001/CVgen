import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './components/main-page/main-page.component';
import { PrimeDesignModule } from '../prime-design/prime-design.module';
import { HeaderComponent } from './components/header/header.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { CrumbsComponent } from './components/crumbs/crumbs.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    MainPageComponent,
    HeaderComponent,
    NavigationComponent,
    CrumbsComponent,
  ],
  imports: [
    CommonModule,
    PrimeDesignModule,
    TranslateModule,
    RouterModule,
    SharedModule,
  ],
  exports: [MainPageComponent],
})
export class HomeModule {}
