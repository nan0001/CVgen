import { FormControl } from '@angular/forms';

export interface ControlInterface {
  key: string;
  value: FormControl<string | null>;
}
