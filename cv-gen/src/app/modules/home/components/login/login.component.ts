import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../../core/store/actions/auth.actions';
import { selectEmail } from '../../../core/store/selectors/auth.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  public user$ = this.store.select(selectEmail);

  constructor(
    private store: Store,
    private router: Router
  ) {}

  public logout(): void {
    this.store.dispatch(AuthActions.signOut());
  }

  public login(): void {
    this.router.navigate(['auth']);
  }
}
