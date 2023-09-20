import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LanguageService } from './modules/core/services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public title = 'cv-gen';

  constructor(private langService: LanguageService) {
    langService.setInitLang();
  }

  //TODO: set initial lang when app is loaded
}
