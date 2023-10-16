import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LangSwitchComponent } from './components/lang-switch/lang-switch.component';
import { ThemeSwitchComponent } from './components/theme-switch/theme-switch.component';
import { PrimeDesignModule } from '../prime-design/prime-design.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorMsgPipe } from './pipes/error-msg.pipe';
import { DoubleDateComponent } from './components/double-date/double-date.component';
import { LabelledInputComponent } from './components/labelled-input/labelled-input.component';
import { ErrorMessageDirective } from './directives/error-message.directive';
import { LevelInputComponent } from './components/level-input/level-input.component';
import { FileNotExistComponent } from './components/file-not-exist/file-not-exist.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { DialogComponent } from './components/dialog/dialog.component';

@NgModule({
  declarations: [
    LangSwitchComponent,
    ThemeSwitchComponent,
    ErrorMsgPipe,
    DoubleDateComponent,
    LabelledInputComponent,
    ErrorMessageDirective,
    LevelInputComponent,
    FileNotExistComponent,
    SpinnerComponent,
    DialogComponent,
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
    ErrorMsgPipe,
    DoubleDateComponent,
    LabelledInputComponent,
    ErrorMessageDirective,
    LevelInputComponent,
    FileNotExistComponent,
    SpinnerComponent,
    DialogComponent,
  ],
})
export class SharedModule {}
