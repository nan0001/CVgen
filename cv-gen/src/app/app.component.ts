import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { LanguageService } from './modules/core/services/language.service';
import { Store } from '@ngrx/store';
import { AuthActions } from './modules/core/store/actions/auth.actions';
import { ThemeService } from './modules/core/services/theme.service';
import { PrimeNGConfig, Translation } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  public title = 'cv-gen';

  private subscription!: Subscription;

  constructor(
    private langService: LanguageService,
    private store: Store,
    private themeService: ThemeService,
    private config: PrimeNGConfig
  ) {}

  public ngOnInit(): void {
    this.langService.setInitLang();
    this.themeService.setInitTheme();
    this.store.dispatch(AuthActions.checkUser());

    this.subscription = this.langService
      .getTranslationObservable('PRIMENG')
      .subscribe(res => {
        const translation = res as unknown;
        this.config.setTranslation(translation as Translation);
      });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
