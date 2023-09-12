import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { THEMES } from '../models/themes.model';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentTheme = THEMES.Light;
  public currentTheme$ = new BehaviorSubject<THEMES>(THEMES.Light);

  constructor(@Inject(DOCUMENT) private document: Document) {}

  public switchTheme(): void {
    const themeLink = this.document.getElementById(
      'app-theme'
    ) as HTMLLinkElement;

    this.currentTheme =
      this.currentTheme === THEMES.Light ? THEMES.Dark : THEMES.Light;

    if (themeLink) {
      themeLink.href = this.currentTheme + '.css';
    }

    this.currentTheme$.next(this.currentTheme);
  }
}
