import { IUser } from "../authentication/interfaces/iuser";
import { Entity } from "../global/interfaces/entity";
import { ROLE } from "../utils/roles";

export class User implements Entity {
    constructor(
        public id: string,
        public username: string,
        public firstname: string | undefined,
        public lastname: string | undefined,
        public phoneNumber: string | undefined,
        public role: ROLE
    )
    {}

    toString() {
        let str = '';
        if (this.lastname && this.lastname.length != 0) {
            str += this.lastname;
            if (this.firstname && this.firstname.length != 0)
                str += ' ' + this.firstname;
        }

        return str || this.username;
    }

    getId(): string {
        return this.id;
    }

    static fromIUser(user: IUser): User {
        return new User(
            user.id,
            user.username,
            user.firstname,
            user.lastname,
            user.phoneNumber,
            user.role
        );
    }
}