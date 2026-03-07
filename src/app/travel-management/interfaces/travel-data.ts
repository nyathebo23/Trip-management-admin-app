import { TravelType } from "../enums/travel-type";

export interface TravelData {
    departAgencyId: string;
    arrivalAgencyId: string;
    busId: string | null;
    busDriverId: string | null;
    plannedDepartDatetime: Date;
    travelType: TravelType;
}
