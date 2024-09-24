import { Team } from './team.model';
import { Player } from './player.model';

export interface Session {
  uuid?: string;
  date: string;
  players: Player[];
  teams: Team[];
  isToday?: boolean;
}

