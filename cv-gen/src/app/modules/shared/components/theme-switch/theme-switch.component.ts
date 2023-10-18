import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
          transform: 'translateX(calc(-100% + 1rem))',
        })
      ),
      transition(`${THEMES.Light} <=> ${THEMES.Dark}`, animate(500)),
    ]),
  ],
})
export class ThemeSwitchComponent {
  public theme: BehaviorSubject<THEMES> = this.themeService.currentTheme$;

  constructor(private themeService: ThemeService) {}

  public switchTheme(): void {
    this.themeService.switchTheme();
  }
}
