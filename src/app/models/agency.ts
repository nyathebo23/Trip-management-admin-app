import { IAgency } from "../params-entities-views/agency-management/interfaces/iagency";
import { Entity } from "../global/interfaces/entity";
import { City } from "./city";

export class Agency implements Entity {
    constructor(
        public id: string, 
        public locationDesc: string, 
        public quarter: string, 
        public city: City
    ) {}

    static fromIAgency(agency: IAgency): Agency {
        return new Agency(
            agency.id,
            agency.locationDesc,
            agency.quarter,
            new City(agency.city.id, agency.city.name)
        );
    }

    getId(): string {
        return this.id;
    }

    toString() {
        return this.city.name + ', ' + this.quarter + ' - ' + this.locationDesc
    }
}