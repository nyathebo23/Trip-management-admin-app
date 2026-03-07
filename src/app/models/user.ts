import { ROLE } from "../utils/roles";

export class User {
    constructor(
        public id: string,
        public username: string,
        public firstname: string,
        public lastname: string,
        public phoneNumber: string,
        public role: ROLE
    )
    {}

    toString() {
        if (this.lastname.length != 0)
            return this.lastname + ' ' + this.firstname;
        return this.username;
    }
}