export interface LoginInterface {
    email: string;
    password: string;
}

export class Login implements LoginInterface {
    email: string;
    password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}