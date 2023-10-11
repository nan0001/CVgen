import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LanguageService } from './modules/core/services/language.service';
import { Store } from '@ngrx/store';
import { AuthActions } from './modules/core/store/actions/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public title = 'cv-gen';

  constructor(
    private langService: LanguageService,
    private store: Store
  ) {
    langService.setInitLang();
    store.dispatch(AuthActions.checkUser());
  }

  //TODO: set initial lang when app is loaded
}
