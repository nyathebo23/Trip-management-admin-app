import { IBus } from "../params-entities-views/bus-management/interfaces/ibus";
import { Entity } from "../global/interfaces/entity";

export class Bus implements Entity {
    constructor(
        public id: string,
        public serialNumber: string,
        public brand: string,
        public capacity: number,
        public usable: boolean
    ){}

    toString() {
        return this.brand + ' - ' + this.serialNumber;
    }

    getId(): string {
        return this.id;
    }

    static fromIBus(bus: IBus): Bus {
        return new Bus(
            bus.id,
            bus.serialNumber,
            bus.brand,
            bus.capacity,
            bus.usable
        );
    }
}