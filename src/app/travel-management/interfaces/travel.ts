import { TravelState } from "../enums/travel-state";
import { TravelType } from "../enums/travel-type";

export interface ITravel {
    id: string;
    departAgencyId: string;
    arrivalAgencyId: string;
    busId: string;
    busDriverId: string;
    plannedDepartDatetime: Date;
    effectiveDepartDatetime?: Date;
    arrivalDatetime?: Date;
    travelType: TravelType;
    travelState: TravelState;
}