import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {
  @Input() isShown = false;
  @Input() textToTranslate = 'INFO.infoSaved';
}
