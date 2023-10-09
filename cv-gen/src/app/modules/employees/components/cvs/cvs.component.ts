import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { EmployeeInterface } from '../../../core/models/employee.model';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { CvActions } from '../../store/actions/cv.actions';
import { CvInterface } from '../../../core/models/cv.models';
import {
  selectCvById,
  selectNewlyAddedCv,
} from '../../store/selectors/cv.selectors';

@Component({
  selector: 'app-cvs',
  templateUrl: './cvs.component.html',
  styleUrls: ['./cvs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvsComponent implements OnInit {
  @Input() employee!: EmployeeInterface;

  public pickedCv$:
    | Observable<CvInterface | null>
    | Observable<Omit<CvInterface, 'id'>> = of(null);

  constructor(private store: Store) {}

  public ngOnInit(): void {
    this.store.dispatch(CvActions.loadCvs());
  }

  public setPickedCv(props: { id: string; name: string }): void {
    const emptyCv: Omit<CvInterface, 'id'> = {
      name: props.name,
      firstName: this.employee.firstName,
      lastName: this.employee.lastName,
      description: '',
      employeeId: this.employee.id,
      projects: [],
      skills: this.employee.skills,
      langs: this.employee.langs,
    };
    this.pickedCv$ =
      props.id !== 'new'
        ? this.store.select(selectCvById({ id: props.id }))
        : of(emptyCv);
  }

  public changePicked(addedCv: Omit<CvInterface, 'id'>): void {
    this.pickedCv$ = this.store.select(selectNewlyAddedCv({ newCv: addedCv }));
  }
}
