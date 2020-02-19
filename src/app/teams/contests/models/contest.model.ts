import { User } from 'firebase';

export class Contest {
    id?: string;
    creator: User;
    players: Array<User>;
    wordsConut: number = 0;
    teamId: string;
}