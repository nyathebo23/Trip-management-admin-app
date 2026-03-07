import { City } from "./city";

export class Agency {
    constructor(
        public id: string, 
        public locationDesc: string, 
        public quarter: string, 
        public city: City
    ) {}

    toString() {
        return this.city.name + ', ' + this.quarter + ' - ' + this.locationDesc
    }
}