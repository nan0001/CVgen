import {
  Directive,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[appErrorMessage]',
})
export class ErrorMessageDirective implements OnInit, OnChanges {
  @Input('appErrorMessage') showError = false;

  @HostBinding('style.color') color = 'var(--red-500)';
  @HostBinding('style.visibility') visibility = 'hidden';

  public ngOnInit(): void {
    this.color = 'var(--red-500)';
    this.visibility = 'hidden';
    this.setVisibility();
  }

  public ngOnChanges(): void {
    this.setVisibility();
  }

  private setVisibility(): void {
    if (this.showError) {
      this.visibility = 'visible';
    } else {
      this.visibility = 'hidden';
    }
  }
}
