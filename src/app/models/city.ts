import { ICity } from "../params-entities-views/city-management/interfaces/icity";
import { Entity } from "../global/interfaces/entity";

export class City implements Entity {
    constructor(public id: string, public name: string){}

    toString() {
        return this.name;
    }

    getId(): string {
        return this.id;
    }

    static fromICity(city: ICity): City {
        return new City(
            city.id,
            city.name
        );
    }
}