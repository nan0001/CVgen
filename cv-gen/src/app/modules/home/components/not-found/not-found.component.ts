import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {
  public currentTheme$ = this.themeService.currentTheme$;

  constructor(
    private router: Router,
    private themeService: ThemeService
  ) {}

  public goHome(): void {
    this.router.navigate(['']);
  }
}
