import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, Firestore, getDoc, updateDoc } from '@angular/fire/firestore';
import { from, map, Observable, of } from 'rxjs';
import { Session } from '../models/session.model';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private collectionName = 'sessions';

  constructor(private firestore: Firestore) {
  }

  getSessions(): Observable<Session[]> {
    return from(collectionData(collection(this.firestore, this.collectionName), { idField: 'id' })).pipe(
      map((data) => data.map((d) => {
          return {
            uuid: d.id,
            date: d['date'],
            players: d['players'],
            teams: d['teams'],
            isToday: false,
          };
        },
      )),
    );
  }

  getSession(uuid: string): Observable<Session> {
    if (!!uuid) {
      return from(getDoc(doc(this.firestore, this.collectionName, uuid))).pipe(
        map((doc) => {
          let session: Session = null;
          if (doc.exists()) {
            session = {
              date: doc.get('date'),
              players: doc.get('players'),
              teams: doc.get('teams'),
              uuid: doc.id,
            };
          }
          return session;
        }),
      );
    } else {
      return of(null);
    }
  }

  createSession(session: Session): Observable<Session> {
    const objectToSave: Session = {
      date: session.date,
      players: session.players,
      teams: session.teams,
    };
    return from(addDoc(collection(this.firestore, this.collectionName), objectToSave))
      .pipe(map((doc) => {
        return { ...session, uuid: doc.id } as Session;
      }));
  }

  updateSession(session: Partial<Session>): Observable<void> {
    return from(updateDoc(doc(this.firestore, this.collectionName, session.uuid), session));
  }
}
