import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

enum THEMES {
  Light = 'soho-light',
  Dark = 'soho-dark',
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public currentTheme = THEMES.Light;

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
  }
}
