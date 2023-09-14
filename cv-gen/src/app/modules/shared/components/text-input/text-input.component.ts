import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ControlInterface } from '../../../core/models/control.model';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { Observable } from 'rxjs';
import { ValidationErrorService } from '../../../core/services/validation-error.service';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextInputComponent implements OnInit {
  @Input() control!: ControlInterface;

  public form!: FormGroup;

  constructor(
    private rootFormGroup: FormGroupDirective,
    private errorService: ValidationErrorService
  ) {}

  public ngOnInit(): void {
    this.form = this.rootFormGroup.form;
  }

  public showError(
    control: FormControl<string | null>,
    name: string
  ): Observable<string> {
    return this.errorService.showError(control, name);
  }
}
