import { Injectable } from '@angular/core';
import { from, Observable, BehaviorSubject } from 'rxjs';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { onAuthStateChanged, UserCredential } from '@angular/fire/auth';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = getAuth();
  private storageKey = 'user';
  private localUser = this.localStorageService.getItem(this.storageKey);

  public user$ = new BehaviorSubject<string | null>(this.localUser);

  constructor(private localStorageService: LocalStorageService) {}

  public signIn(email: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  public signOut(): Observable<void> {
    return from(signOut(this.auth));
  }

  public getUser(): BehaviorSubject<string | null> {
    const unregisterAuthObserver = onAuthStateChanged(this.auth, user => {
      this.user$.next(user ? user.email : null);
      if (user) {
        unregisterAuthObserver();
      }
    });
    return this.user$;
  }
}
