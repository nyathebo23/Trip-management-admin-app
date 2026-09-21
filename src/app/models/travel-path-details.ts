import { Entity } from "../global/interfaces/entity";
import { ITravelPathDetails } from "../params-entities-views/travel-path-management/interfaces/itravel-path-details";
import { Agency } from "./agency";

class TravelDuration {
    constructor(
        public hours: number,
        public minutes: number
    ){}

    toString(): string {
        const hoursStr = this.hours.toString().padStart(2, '0');
        const minutesStr = this.minutes.toString().padStart(2, '0');
        return `${hoursStr} hours ${minutesStr} min`;
    }
}

export class TravelPathDetails implements Entity {
    constructor(
        public id: string,
        public agency1: Agency,
        public agency2: Agency,
        public distance: number,
        public estimatedTravelDuration: TravelDuration
    ){}

    toString() {
        return `${this.agency1.toString()} -- ${this.agency2.toString()}`;
    }

    static fromITravelPathDetails(travelPathDetails: ITravelPathDetails): TravelPathDetails {
        const durationParts = travelPathDetails.estimatedTravelDuration.split(':');
        if (durationParts.length < 2) {
            return new TravelPathDetails(
                travelPathDetails.id,
                Agency.fromIAgency(travelPathDetails.agency1),
                Agency.fromIAgency(travelPathDetails.agency2),
                travelPathDetails.distance,
                new TravelDuration(NaN, NaN)
            );
        }
        const hours = parseInt(durationParts[0], 10);
        const minutes = parseInt(durationParts[1], 10);
        return new TravelPathDetails(
            travelPathDetails.id,
            Agency.fromIAgency(travelPathDetails.agency1),
            Agency.fromIAgency(travelPathDetails.agency2),
            travelPathDetails.distance,
            new TravelDuration(hours, minutes)
        );
    }

    getId(): string {
        return this.id;
    }
}