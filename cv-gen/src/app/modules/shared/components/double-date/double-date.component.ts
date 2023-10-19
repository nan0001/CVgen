/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ProjectInterface } from '../../../core/models/project.model';
import { LanguageService } from '../../../core/services/language.service';
import { Subscription } from 'rxjs';

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
export class DoubleDateComponent
  implements ControlValueAccessor, OnInit, OnDestroy
{
  private _startDate = new Date();
  private _endDate = new Date();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onChange: any = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onTouch: any = () => {};

  private currentLang$ = this.langService.currentLang$;
  private subscription!: Subscription;

  constructor(private langService: LanguageService) {}

  public ngOnInit(): void {
    this.subscription = this.currentLang$.subscribe(() => {
      //cdr doesn't update p-component view, need this to display date in different formats
      this.startDate = new Date(this._startDate);
      this.endDate = new Date(this._endDate);
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

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
