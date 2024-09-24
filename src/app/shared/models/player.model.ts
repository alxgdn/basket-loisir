import { Timestamp } from '@angular/fire/firestore';

export interface Player {
  uuid?: string;
  gender: Gender;
  lastname: string;
  firstname: string;
  birthdate?: Timestamp;
  post: Post;
  level: number;
  picture?: string;
}

export enum Gender {
  MALE = 0,
  FEMALE = 1
}

export enum Post {
  GUARD = 'GUARD',
  FORWARD = 'FORWARD',
  CENTER = 'CENTER',
}
