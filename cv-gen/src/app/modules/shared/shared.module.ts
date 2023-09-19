import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LangSwitchComponent } from './components/lang-switch/lang-switch.component';
import { ThemeSwitchComponent } from './components/theme-switch/theme-switch.component';
import { PrimeDesignModule } from '../prime-design/prime-design.module';
import { TextInputComponent } from './components/text-input/text-input.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputErrorDirective } from './directives/input-error.directive';
import { ErrorMsgPipe } from './pipes/error-msg.pipe';
import { LevelInputComponent } from './components/level-input/level-input.component';
import { SkillsComponent } from './components/skills/skills.component';

@NgModule({
  declarations: [
    LangSwitchComponent,
    ThemeSwitchComponent,
    TextInputComponent,
    InputErrorDirective,
    ErrorMsgPipe,
    LevelInputComponent,
    SkillsComponent,
  ],
  imports: [
    CommonModule,
    PrimeDesignModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    LangSwitchComponent,
    ThemeSwitchComponent,
    TextInputComponent,
    InputErrorDirective,
    ErrorMsgPipe,
    LevelInputComponent,
    SkillsComponent,
  ],
})
export class SharedModule {}
