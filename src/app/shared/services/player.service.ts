import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, Firestore, getDoc, updateDoc } from '@angular/fire/firestore';
import { from, map, Observable, of } from 'rxjs';
import { Player } from '../models/player.model';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private collectionName = 'players';

  constructor(private firestore: Firestore) {
  }

  getPlayers(): Observable<Player[]> {
    return from(collectionData(collection(this.firestore, this.collectionName), { idField: 'id' })).pipe(
      map((data) => data.map((d) => {
          return {
            uuid: d.id,
            gender: d['gender'],
            lastname: d['lastname'],
            firstname: d['firstname'],
            post: d['post'],
            level: d['level'],
            picture: d['picture'],
          };
        },
      )),
    );
  }

  getPlayer(uuid: string): Observable<Player> {
    if (!!uuid) {
      return from(getDoc(doc(this.firestore, this.collectionName, uuid))).pipe(
        map((doc) => {
          let player: Player = null;
          if (doc.exists()) {
            player = {
              uuid: doc.id,
              gender: doc.get('gender'),
              firstname: doc.get('firstname'),
              lastname: doc.get('lastname'),
              level: doc.get('level'),
              post: doc.get('post'),
              picture: doc.get('picture'),
            };
          }
          return player;
        }),
      );
    } else {
      return of(null);
    }
  }


  createPlayer(player: Partial<Player>): Observable<Player> {
    return from(addDoc(collection(this.firestore, this.collectionName), player))
      .pipe(map((doc) => {
        return { ...player, uuid: doc.id } as Player;
      }));
  }

  editPlayer(uuid: string, player: Partial<Player>): Observable<void> {
    return from(updateDoc(doc(this.firestore, this.collectionName, uuid), player));
  }
}
