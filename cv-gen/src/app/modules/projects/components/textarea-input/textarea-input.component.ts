import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlInterface } from '../../../core/models/control.model';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-textarea-input',
  templateUrl: './textarea-input.component.html',
  styleUrls: ['./textarea-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextareaInputComponent implements OnInit, OnDestroy {
  @Input() control!: ControlInterface;

  public form!: FormGroup;
  public subscription!: Subscription;

  constructor(
    private rootFormGroup: FormGroupDirective,
    private cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.form = this.rootFormGroup.form;
    this.subscription = this.control.value.valueChanges.subscribe(()=>{
      this.cdr.markForCheck();
    })
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
