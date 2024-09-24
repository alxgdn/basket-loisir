import { Player } from './player.model';

export interface Team {
  players: Player[];
  color: Color;
}

export enum Color {
  BLACK = 'Noir',
  RED = 'Rouge',
  BLUE = 'Bleu',
  WHITE = 'Blanc',
  YELLOW = 'Jaune',
  GREEN = 'Vert'
}
