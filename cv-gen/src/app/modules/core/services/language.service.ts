import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LANGUAGE } from '../constants/language.constant';
import { Observable, combineLatest } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private storageKey = 'lang';
  private storedLang = this.localStorageService.getItem(this.storageKey);
  public currentLang = this.storedLang ? this.storedLang : LANGUAGE.En;

  constructor(
    private translate: TranslateService,
    private localStorageService: LocalStorageService
  ) {}

  public setInitLang(): void {
    this.translate.setDefaultLang(this.currentLang);
  }

  public setLang(lang: LANGUAGE): void {
    this.translate.use(lang);
    this.currentLang = lang;
    this.localStorageService.setStorage(this.storageKey, lang);
  }

  public getTranslationObservable(
    key: string,
    params?: { [key: string]: string }
  ): Observable<string> {
    return this.translate.stream(key, params);
  }

  public getMultipleTranslationStream(keys: string[]): Observable<string[]> {
    const observableArray: Observable<string>[] = keys.map(val => {
      return this.translate.stream(val);
    });

    return combineLatest(observableArray);
  }
}
