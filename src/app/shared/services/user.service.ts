import { Injectable } from '@angular/core';
import { BehaviorSubject, from, map, Observable, switchMap, tap } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../models/user.model';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { BrowserStorageService } from '../helpers/browser-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private collectionName = 'admins';
  private sessionKey = 'user';
  private userChanged$: BehaviorSubject<void> = new BehaviorSubject<void>(null);

  constructor(private angularFireAuth: AngularFireAuth, private firestore: Firestore, private storage: BrowserStorageService) {
  }

  hasUserChanged(): Observable<void> {
    return this.userChanged$.asObservable();
  }

  getUserConnected(): User {
    return this.storage.getFromSessionStorage(this.sessionKey);
  }

  loginWithEmail(email: string, password: string): Observable<User> {
    return this.login(this.angularFireAuth.signInWithEmailAndPassword(email, password));
  }

  loginWithGoogle(): Observable<User> {
    return this.login(this.angularFireAuth.signInWithPopup(new GoogleAuthProvider()));
  }

  signinWithEmail(email: string, password: string) {
    return this.login(this.angularFireAuth.createUserWithEmailAndPassword(email, password));
  }

  logout() {
    this.angularFireAuth.signOut().then(() => {
      this.storage.addToSessionStorage(this.sessionKey, null);
      this.userChanged$.next();
    });
  }

  private login(promise: Promise<any>): Observable<User> {
    return from(promise)
      .pipe(
        switchMap((credentials) => this.isAdmin(credentials.user.uid)),
        tap((user) => {
          this.storage.addToSessionStorage(this.sessionKey, user);
          this.userChanged$.next();
        }),
      );
  }

  private isAdmin(uuid: string): Observable<User> {
    return from(getDoc(doc(this.firestore, this.collectionName, uuid))).pipe(
      map((doc) => {
        return { uuid, isAdmin: doc.exists() };
      }),
    );
  }

}
