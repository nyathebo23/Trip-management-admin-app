import { TravelType } from "../enums/travel-type";

export interface TravelData {
    departAgencyId: string;
    travelPathId: string;
    busId: string | null;
    busDriverId: string | null;
    plannedDepartDatetime: Date;
    travelType: TravelType;
    ticketPrice: number;
    reservationFees: number;
}
