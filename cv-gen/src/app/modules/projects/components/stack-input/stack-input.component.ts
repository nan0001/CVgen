import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { EntitiesService } from '../../../core/services/entities.service';
import { BehaviorSubject, Observable, filter, map, of, take } from 'rxjs';

@Component({
  selector: 'app-stack-input',
  templateUrl: './stack-input.component.html',
  styleUrls: ['./stack-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StackInputComponent implements OnInit {
  @Input() controlName = '';

  public form!: FormGroup;
  public optionsFiltered$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  public control!: FormControl<string[] | null>;
  private options$ = this.entitiesService.getEntityList('skills');

  constructor(
    private rootFormGroup: FormGroupDirective,
    private entitiesService: EntitiesService
    ) {}

  public ngOnInit(): void {
    this.form = this.rootFormGroup.form;
    this.control = this.form.get(this.controlName) as FormControl<string[] | null>;
    this.filterOptions('');
  }

  public filterOptions(query: string): void {
    this.options$.pipe(take(1)).subscribe((val) => {
      if (val){
        const filteredArray = val.filter((elem) => elem.toLowerCase().includes(query.toLowerCase()));
        this.optionsFiltered$.next(filteredArray);
        return;
      }
      this.optionsFiltered$.next([]);
    })
  }
}
