/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  forwardRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SkillsInterface } from '../../../core/models/skills.model';

interface AutoCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-level-input',
  templateUrl: './level-input.component.html',
  styleUrls: ['./level-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LevelInputComponent),
      multi: true,
    },
  ],
})
export class LevelInputComponent implements ControlValueAccessor {
  @Input() options: string[] = [];
  @Output() optionRemoved = new EventEmitter();

  public levels = ['Beginner', 'Intermediate', 'Advanced'];
  public _selectedOption = '';
  public _selectedLevel = '';

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onChange: any = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onTouch: any = () => {};

  @Input()
  public set selectedLevel(value: string) {
    this._selectedLevel = value;
    this.onChange({ name: this.selectedOption, level: this.selectedLevel });
    this.onTouch({ name: this.selectedOption, level: this.selectedLevel });
  }

  public get selectedLevel(): string {
    return this._selectedLevel;
  }

  @Input()
  public set selectedOption(value: string) {
    this._selectedOption = value;
    this.onChange({ name: this.selectedOption, level: this.selectedLevel });
    this.onTouch({ name: this.selectedOption, level: this.selectedLevel });
  }

  public get selectedOption(): string {
    return this._selectedOption;
  }

  public filterLevel(event: AutoCompleteEvent): void {
    this.levels = [
      ...this.levels.filter(val =>
        val.toLowerCase().includes(event.query.toLowerCase())
      ),
    ];
  }

  public filterOptions(event: AutoCompleteEvent): void {
    this.options = [
      ...this.options.filter(val =>
        val.toLowerCase().includes(event.query.toLowerCase())
      ),
    ];
  }

  public writeValue(value: SkillsInterface | null): void {
    if (value) {
      this.selectedLevel = value.level;
      this.selectedOption = value.name;
    }
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  onRemove() {
    this.optionRemoved.emit();
  }
}
