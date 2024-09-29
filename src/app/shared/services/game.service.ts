import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, Firestore, getDoc, updateDoc } from '@angular/fire/firestore';
import { from, map, Observable, of } from 'rxjs';
import { Session } from '../models/session.model';
import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private collectionName = 'games';

  constructor(private firestore: Firestore) {
  }

  getGames(): Observable<Game[]> {
    return from(collectionData(collection(this.firestore, this.collectionName), { idField: 'id' })).pipe(
      map((data) => data.map((d) => {
          return {
            uuid: d.id,
            date: d['date'],
            opponent: d['opponent'],
            score: d['score'],
            team: d['team'],
            isAway: d['isAway'],
          };
        },
      )),
    );
  }

  getGame(uuid: string): Observable<Game> {
    if (!!uuid) {
      return from(getDoc(doc(this.firestore, this.collectionName, uuid))).pipe(
        map((doc) => {
          let game: Game = null;
          if (doc.exists()) {
            game = {
              uuid: doc.id,
              date: doc.get('date'),
              opponent: doc.get('opponent'),
              score: doc.get('score'),
              team: doc.get('team'),
              isAway: doc.get('isAway'),
            };
          }
          return game;
        }),
      );
    } else {
      return of(null);
    }
  }

  createGame(game: Game): Observable<Game> {
    const objectToSave: Game = {
      date: game.date,
      opponent: game.opponent,
      team: game.team,
      isAway: game.isAway,
    };
    return from(addDoc(collection(this.firestore, this.collectionName), objectToSave))
      .pipe(map((doc) => {
        return { ...game, uuid: doc.id } as Game;
      }));
  }

  updateSession(session: Partial<Session>): Observable<void> {
    return from(updateDoc(doc(this.firestore, this.collectionName, session.uuid), session));
  }
}
