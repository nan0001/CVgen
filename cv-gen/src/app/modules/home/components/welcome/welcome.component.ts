import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeComponent {
  public currentTheme$ = this.themeService.currentTheme$;

  constructor(private themeService: ThemeService) {}
}
