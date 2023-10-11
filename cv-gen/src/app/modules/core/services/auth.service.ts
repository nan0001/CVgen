import { Injectable } from '@angular/core';
import { from, Observable, BehaviorSubject } from 'rxjs';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { onAuthStateChanged, User, UserCredential } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = getAuth();
  public user$ = new BehaviorSubject<User | null>(this.auth.currentUser);

  public signIn(email: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  public signOut(): Observable<void> {
    return from(signOut(this.auth));
  }

  public getUser(): BehaviorSubject<User | null> {
    const unregisterAuthObserver = onAuthStateChanged(this.auth, user => {
      this.user$.next(user);
      if (user) {
        unregisterAuthObserver();
      }
    });
    return this.user$;
  }
}
