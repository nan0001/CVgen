import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { EmployeeInterface } from '../../../core/models/employee.model';
import { CvInterface } from '../../../core/models/cv.models';
import { CvService } from '../../../core/services/cv.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-cvs',
  templateUrl: './cvs.component.html',
  styleUrls: ['./cvs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvsComponent {
  @Input() employee!: EmployeeInterface;

  public pickedCv$: Observable<CvInterface | null> = of(null);

  constructor(private cvService: CvService) {}

  public setPickedCv(id: string): void {
    this.pickedCv$ = this.cvService.getCvById(id);
  }
}
