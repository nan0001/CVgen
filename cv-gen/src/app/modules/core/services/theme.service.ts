import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { THEMES } from '../constants/themes.constant';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private storageKey = 'theme';
  private storedTheme = this.localStorageService.getItem(this.storageKey);
  private currentTheme: THEMES = this.storedTheme
    ? (this.storedTheme as THEMES)
    : THEMES.Light;
  public currentTheme$ = new BehaviorSubject<THEMES>(this.currentTheme);

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private localStorageService: LocalStorageService
  ) {}

  public setInitTheme(): void {
    const themeLink = this.document.getElementById(
      'app-theme'
    ) as HTMLLinkElement;

    if (themeLink) {
      themeLink.href = this.currentTheme + '.css';
    }
  }

  public switchTheme(): void {
    const themeLink = this.document.getElementById(
      'app-theme'
    ) as HTMLLinkElement;

    this.currentTheme =
      this.currentTheme === THEMES.Light ? THEMES.Dark : THEMES.Light;

    this.localStorageService.setStorage(this.storageKey, this.currentTheme);

    if (themeLink) {
      themeLink.href = this.currentTheme + '.css';
    }

    this.currentTheme$.next(this.currentTheme);
  }
}
