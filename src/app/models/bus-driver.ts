import { User } from "./user";

export class BusDriver {
    constructor(public id: string, public user: User)
    {}

    toString() {
        return this.user.toString();
    }
}