import { Injectable } from '@angular/core';
import { BehaviorSubject, from, map, Observable, switchMap, tap } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../models/user.model';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private collectionName = 'admins';
  private userConnected$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(private angularFireAuth: AngularFireAuth, private firestore: Firestore) {
  }

  getUserConnected(): Observable<User> {
    return this.userConnected$.asObservable();
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
      this.userConnected$.next(null);
    });
  }

  private login(promise: Promise<any>): Observable<User> {
    return from(promise)
      .pipe(
        switchMap((credentials) => this.isAdmin(credentials.user.uid)),
        tap((user) => {
          this.userConnected$.next(user);
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
