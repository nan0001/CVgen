/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ProjectInterface } from '../../../core/models/project.model';

@Component({
  selector: 'app-double-date',
  templateUrl: './double-date.component.html',
  styleUrls: ['./double-date.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DoubleDateComponent),
      multi: true,
    },
  ],
})
export class DoubleDateComponent implements ControlValueAccessor {
  public _startDate = new Date();
  public _endDate = new Date();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onChange: any = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onTouch: any = () => {};

  @Input()
  public set startDate(value: Date) {
    this._startDate = value;
    this.performListeners();
  }

  public get startDate(): Date {
    return this._startDate;
  }

  @Input()
  public set endDate(value: Date) {
    this._endDate = value;
    this.performListeners();
  }

  public get endDate(): Date {
    return this._endDate;
  }

  public writeValue(value: Pick<ProjectInterface, 'start' | 'end'>): void {
    if (value) {
      this.startDate = value.start;
      this.endDate = value.end;
    }
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  private performListeners(): void {
    const newValue = { start: this.startDate, end: this.endDate };
    this.onChange(newValue);
    this.onTouch(newValue);
  }
}
