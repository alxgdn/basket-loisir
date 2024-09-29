import { Timestamp } from '@angular/fire/firestore';
import { Player } from './player.model';

export interface Game {
  uuid?: string;
  date: Timestamp;
  opponent: {
    name: string;
    location: string;
  };
  score?: {
    jsa: number;
    opponent: number;
  };
  team: Player[];
  isAway: boolean;
}
