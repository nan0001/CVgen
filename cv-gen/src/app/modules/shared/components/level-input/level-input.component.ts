/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  forwardRef,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SkillsInterface } from '../../../core/models/skills.model';
import { AutoCompleteEvent } from '../../../core/models/autocomplete-event.model';
import { LanguageService } from '../../../core/services/language.service';
import { BehaviorSubject, take } from 'rxjs';
import { LEVELS } from '../../../core/constants/levels.constant';

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
export class LevelInputComponent implements ControlValueAccessor, OnInit {
  @Input() options: string[] = [];
  @Output() optionRemoved = new EventEmitter();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onChange: any = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onTouch: any = () => {};
  public levels$ = this.langService.getMultipleTranslationStream([
    'LEVELS.beginner',
    'LEVELS.intermediate',
    'LEVELS.advanced',
  ]);
  public levelsEnum = LEVELS;
  public filteredOptions: string[] = [];
  public filteredLevels$: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >([]);

  private _selectedOption = '';
  private _selectedLevelIndex = 0;

  constructor(private langService: LanguageService) {}

  public ngOnInit(): void {
    this.filterLevel('');
  }

  @Input()
  public set selectedLevelIndex(value: number) {
    this._selectedLevelIndex = value;
    this.performListeners();
  }

  public get selectedLevelIndex(): number {
    return this._selectedLevelIndex;
  }

  @Input()
  public set selectedOption(value: string) {
    this._selectedOption = value;
    this.performListeners();
  }

  public get selectedOption(): string {
    return this._selectedOption;
  }

  public filterLevel(query: string): void {
    this.levels$.pipe(take(1)).subscribe(val => {
      if (val) {
        const filteredArray = val.filter(elem =>
          elem.toLowerCase().includes(query.toLowerCase())
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
      this.selectedLevelIndex = value.level;
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

  public onLevelChange(newValue: string, array: string[]) {
    const index = array.findIndex(val => val === newValue);
    if (index !== -1) {
      this.selectedLevelIndex = index;
    }
  }

  private performListeners(): void {
    const newValue = {
      name: this.selectedOption,
      level: this.selectedLevelIndex,
    };
    this.onChange(newValue);
    this.onTouch(newValue);
  }
}
