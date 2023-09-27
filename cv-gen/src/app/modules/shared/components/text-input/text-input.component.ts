import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ControlInterface } from '../../../core/models/control.model';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextInputComponent implements OnInit, OnDestroy {
  @Input() control!: ControlInterface;

  public form!: FormGroup;
  public subscription!: Subscription;

  constructor(
    private rootFormGroup: FormGroupDirective,
    private cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.form = this.rootFormGroup.form;
    this.subscription = this.control.value.valueChanges.subscribe(() => {
      this.cdr.markForCheck();
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}