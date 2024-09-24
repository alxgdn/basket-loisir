import { Gender, Player } from '../models/player.model';
import _ from 'lodash';

export class TeamUtils {

  static calculateAverageRate(players: Player[]): number {
    // Pour calculer on applique un coeff 2 pour les garçons sur leur niveau
    // coeff 1 pour les filles
    return _.sum(players.map((p) => +p.level * (2 - p.gender))) / (players.filter((p) => p.gender == Gender.MALE).length * 2 + players.filter((p) => p.gender == Gender.FEMALE).length);
  }
}
