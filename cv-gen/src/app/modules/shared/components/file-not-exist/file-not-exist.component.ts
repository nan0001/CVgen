import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-file-not-exist',
  templateUrl: './file-not-exist.component.html',
  styleUrls: ['./file-not-exist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileNotExistComponent {
  @Input() buttonRoute = '';

  public currentTheme$ = this.themeService.currentTheme$;

  constructor(
    private router: Router,
    private themeService: ThemeService
  ) {}

  public goToList(): void {
    this.router.navigate([this.buttonRoute]);
  }
}
