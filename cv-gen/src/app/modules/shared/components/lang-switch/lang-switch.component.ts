import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LanguageService } from '../../../core/services/language.service';
import { LANGUAGE } from '../../../core/constants/language.constant';

@Component({
  selector: 'app-lang-switch',
  templateUrl: './lang-switch.component.html',
  styleUrls: ['./lang-switch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LangSwitchComponent {
  public currentLang = this.langService.currentLang;

  constructor(private langService: LanguageService) {}

  public switchLang(): void {
    const newLang =
      this.currentLang === LANGUAGE.En ? LANGUAGE.Ru : LANGUAGE.En;

    this.langService.setLang(newLang);
    this.currentLang = newLang;
  }
}
