import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { EmployeeInterface } from '../../../core/models/employee.model';
import { CvWithProjects } from '../../../core/models/cv.models';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { CvActions } from '../../store/actions/cv.actions';
import { selectCvWithProjectsById } from '../../store/selectors/cv.selectors';

@Component({
  selector: 'app-cvs',
  templateUrl: './cvs.component.html',
  styleUrls: ['./cvs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvsComponent implements OnInit {
  @Input() employee!: EmployeeInterface;

  public pickedCv$: Observable<CvWithProjects | null> = of(null);

  constructor(private store: Store) {}

  public ngOnInit(): void {
    this.store.dispatch(CvActions.loadCvs());
  }

  public setPickedCv(id: string): void {
    this.pickedCv$ = this.store.select(selectCvWithProjectsById({ id }));
  }
}
