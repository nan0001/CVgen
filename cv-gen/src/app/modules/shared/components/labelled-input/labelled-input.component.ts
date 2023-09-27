import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-labelled-input',
  templateUrl: './labelled-input.component.html',
  styleUrls: ['./labelled-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelledInputComponent implements OnInit {
  @Input() controlName = '';
  @Input() errors: ValidationErrors | null = null;
  @Input() showError = false;
  @Input() showLabel = true;
  @Input() translationParams: string[] = [];

  public messageParams!: Observable<string[]>;

  constructor(private langService: LanguageService) {}

  public ngOnInit(): void {
    if (this.translationParams.length < 1) {
      this.translationParams = ['INFO.' + this.controlName];
    }

    this.messageParams = this.langService.getMultipleTranslationStream(
      this.translationParams
    );
  }
}
