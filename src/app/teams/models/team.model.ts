import { User } from 'src/app/auth/models/user.model';

export class Team {
    id?: string;
    title: string;
    creator: User;
    participants: User[] = [];
    created: number = Date.now();
    addedUser?: boolean = false;
    isMyTeam?: boolean = false;
}