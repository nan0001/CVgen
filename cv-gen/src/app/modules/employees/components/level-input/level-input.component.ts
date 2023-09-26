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
import { AutoCompleteEvent } from '../../../core/models/autocomplete-event.model';
import { LanguageService } from '../../../core/services/language.service';
import { BehaviorSubject, take } from 'rxjs';

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

  public levels$ = this.langService.getMultipleTranslationStream([
    'LEVELS.beginner',
    'LEVELS.intermediate',
    'LEVELS.advanced',
  ]);
  public filteredOptions: string[] = [];
  public filteredLevels$: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >([]);

  private _selectedOption = '';
  private _selectedLevel = '';

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onChange: any = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onTouch: any = () => {};

  constructor(private langService: LanguageService) {}

  @Input()
  public set selectedLevel(value: string) {
    this._selectedLevel = value;
    this.performListeners();
  }

  public get selectedLevel(): string {
    return this._selectedLevel;
  }

  @Input()
  public set selectedOption(value: string) {
    this._selectedOption = value;
    this.performListeners();
  }

  public get selectedOption(): string {
    return this._selectedOption;
  }

  public filterLevel(event: AutoCompleteEvent): void {
    this.levels$.pipe(take(1)).subscribe(val => {
      if (val) {
        const filteredArray = val.filter(elem =>
          elem.toLowerCase().includes(event.query.toLowerCase())
        );
        this.filteredLevels$.next(filteredArray);
        return;
      }
      this.filteredLevels$.next([]);
    });
  }

  public filterOptions(event: AutoCompleteEvent): void {
    this.filteredOptions = this.options.filter(val =>
      val.toLowerCase().includes(event.query.toLowerCase())
    );
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

  public onRemove() {
    this.optionRemoved.emit();
  }

  private performListeners(): void {
    const newValue = { name: this.selectedOption, level: this.selectedLevel };
    this.onChange(newValue);
    this.onTouch(newValue);
  }
}
