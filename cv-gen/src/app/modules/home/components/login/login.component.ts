import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../../core/store/actions/auth.actions';
import { selectEmail } from '../../../core/store/selectors/auth.selectors';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  public user$ = this.store.select(selectEmail);
  public menuItems$!: Observable<MenuItem[]>;

  constructor(
    private store: Store,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.menuItems$ = this.user$.pipe(
      map(user => {
        if (user) {
          return [
            { label: user, disabled: true },
            { icon: 'pi pi-sign-out', command: () => this.logout() },
          ];
        }

        return [
          {
            icon: 'pi pi-sign-in',
            command: () => this.login(),
          },
        ];
      })
    );
  }

  public logout(): void {
    this.store.dispatch(AuthActions.signOut());
  }

  public login(): void {
    this.router.navigate(['auth']);
  }
}
