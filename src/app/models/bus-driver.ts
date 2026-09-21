import { IBusDriver } from "../params-entities-views/bus-driver-management/interfaces/ibus-driver";
import { Entity } from "../global/interfaces/entity";
import { User } from "./user";

export class BusDriver implements Entity {
    constructor(public id: string, public user: User)
    {}

    toString() {
        return this.user.toString();
    }

    getId(): string {
        return this.id;
    }

    fromIBusDriver(busDriver: IBusDriver): BusDriver {
        return new BusDriver(
            busDriver.id,
            User.fromIUser(busDriver.user)
        );
    }
}