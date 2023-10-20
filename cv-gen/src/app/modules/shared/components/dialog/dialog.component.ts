import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {
  @Input() textToTranslate = 'INFO.infoSaved';

  public isShown = false;

  constructor(private cdr: ChangeDetectorRef) {}

  public showMessage(): void {
    this.isShown = true;
    this.cdr.markForCheck();

    setTimeout(() => {
      this.isShown = false;
      this.cdr.markForCheck();
    }, 2000);
  }
}
