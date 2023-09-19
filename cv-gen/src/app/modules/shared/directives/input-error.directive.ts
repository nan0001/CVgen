import {
  Directive,
  HostBinding,
  Input,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appInputError]',
})
export class InputErrorDirective implements OnInit, OnDestroy {
  @Input('appInputError') control!: FormControl;

  @HostBinding('style.color') color = 'var(--red-500)';
  @HostBinding('style.visibility') visibility = 'hidden';

  private subscription!: Subscription;

  public ngOnInit(): void {
    this.color = 'var(--red-500)';
    this.visibility = 'hidden';

    this.subscription = this.control.statusChanges.subscribe(() => {
      if (this.control.invalid && this.control.dirty) {
        this.visibility = 'visible';
      } else {
        this.visibility = 'hidden';
      }
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
