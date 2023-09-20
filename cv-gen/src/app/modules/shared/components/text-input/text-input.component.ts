import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ControlInterface } from '../../../core/models/control.model';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextInputComponent implements OnInit {
  @Input() control!: ControlInterface;

  public form!: FormGroup;

  constructor(private rootFormGroup: FormGroupDirective) {}

  public ngOnInit(): void {
    this.form = this.rootFormGroup.form;
  }
}
