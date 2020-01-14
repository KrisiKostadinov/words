export interface Roles {
    admin: boolean;
    user: boolean;
}

export interface User {
    userId?: string;
    email: string;
    name: string;
    photoUrl?: string;
    emailVerified?: any;
    roles: Roles;
}