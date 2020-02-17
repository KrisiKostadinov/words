import { User } from 'src/app/auth/models/user.model';

export class Team {
    title: string;
    creator: User;
    participants: User[] = [];
    created: number = Date.now();
}