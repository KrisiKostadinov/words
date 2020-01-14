export class Roles {
    user: boolean = true;
    admin?: boolean = false;
}

export interface User {
    userId?: string;
    email: string;
    name?: string;
    photoUrl?: string;
    emailVerified?: any;
    roles?: Roles
}