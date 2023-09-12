import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { LANGUAGE } from '../../constants/language.constant';

@Component({
  selector: 'app-lang-switch',
  templateUrl: './lang-switch.component.html',
  styleUrls: ['./lang-switch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LangSwitchComponent {
  currentLang = LANGUAGE.En;

  constructor(private langService: LanguageService) {}

  public switchLang(): void {
    const newLang =
      this.currentLang === LANGUAGE.En ? LANGUAGE.Ru : LANGUAGE.En;

    this.langService.setLang(newLang);
    this.currentLang = newLang;
  }
}
