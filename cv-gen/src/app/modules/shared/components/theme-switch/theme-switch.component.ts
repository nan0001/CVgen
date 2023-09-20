import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { THEMES } from '../../../core/constants/themes.constant';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-theme-switch',
  templateUrl: './theme-switch.component.html',
  styleUrls: ['./theme-switch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('moveLeft', [
      state(
        THEMES.Light,
        style({
          transform: 'translateX(0)',
        })
      ),
      state(
        THEMES.Dark,
        style({
          transform: 'translateX(calc(-100% + 16px))',
        })
      ),
      transition(`${THEMES.Light} <=> ${THEMES.Dark}`, animate(500)),
    ]),
  ],
})
export class ThemeSwitchComponent implements OnInit, OnDestroy {
  public theme: THEMES = THEMES.Light;
  public light = THEMES.Light;
  public dark = THEMES.Dark;
  private subscription!: Subscription;

  constructor(private themeService: ThemeService) {}

  public ngOnInit(): void {
    this.subscription = this.themeService.currentTheme$.subscribe(val => {
      this.theme = val;
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public switchTheme(): void {
    this.themeService.switchTheme();
  }
}
