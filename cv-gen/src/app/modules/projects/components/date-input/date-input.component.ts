import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { ProjectInterface } from '../../../core/models/project.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateInputComponent implements OnInit {
  @Input() control!: FormControl<Pick<ProjectInterface, 'start' | 'end'> | null>;
  @Input() dates!: Pick<ProjectInterface, 'start' | 'end'>;

  public form!: FormGroup;
  public subscription!: Subscription;

  constructor(
    private rootFormGroup: FormGroupDirective,
    private cdr: ChangeDetectorRef
    ) {}

  public ngOnInit(): void {
    this.form = this.rootFormGroup.form;
    this.subscription = this.control.valueChanges.subscribe(()=>{
      this.cdr.markForCheck();
    })
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
