import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {
  public currentTheme$ = this.themeService.currentTheme$;

  constructor(private themeService: ThemeService) {}
}
