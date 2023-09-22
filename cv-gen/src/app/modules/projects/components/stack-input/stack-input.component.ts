import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AutoCompleteEvent } from '../../../core/models/autocomplete-event.model';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-stack-input',
  templateUrl: './stack-input.component.html',
  styleUrls: ['./stack-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StackInputComponent implements OnInit {
  @Input() controlName = '';

  public form!: FormGroup;
  public optionsFiltered: string[] = [];
  public control!: FormControl<string[] | null>;
  private options = ['Javascript', 'Angular']; //get from entities

  constructor(private rootFormGroup: FormGroupDirective) {}

  public ngOnInit(): void {
    this.form = this.rootFormGroup.form;
    this.control = this.form.get(this.controlName) as FormControl<string[] | null>;
  }

  public filterOptions(event: AutoCompleteEvent): void {
    this.optionsFiltered =
      this.options.filter(val =>
        val.toLowerCase().includes(event.query.toLowerCase())
      );
  }
}
