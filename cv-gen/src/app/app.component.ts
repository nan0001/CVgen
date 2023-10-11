import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { LanguageService } from './modules/core/services/language.service';
import { Store } from '@ngrx/store';
import { AuthActions } from './modules/core/store/actions/auth.actions';
import { ThemeService } from './modules/core/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  public title = 'cv-gen';

  constructor(
    private langService: LanguageService,
    private store: Store,
    private themeService: ThemeService
  ) {}

  public ngOnInit(): void {
    this.langService.setInitLang();
    this.themeService.setInitTheme();
    this.store.dispatch(AuthActions.checkUser());
  }
}
