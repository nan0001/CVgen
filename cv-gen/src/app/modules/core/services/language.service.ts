import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LANGUAGE } from '../constants/language.constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  constructor(private translate: TranslateService) {}

  //TODO: get previously selected lang, store lang

  public setInitLang(): void {
    this.translate.setDefaultLang(LANGUAGE.En);
  }

  public setLang(lang: LANGUAGE): void {
    this.translate.use(lang);
  }

  public getTranslationObservable(
    key: string,
    params?: { [key: string]: string }
  ): Observable<string> {
    return this.translate.get(key, params);
  }
}
