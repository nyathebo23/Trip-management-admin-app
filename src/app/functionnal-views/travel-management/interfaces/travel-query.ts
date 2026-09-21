import { TravelType } from "../enums/travel-type";

export interface TravelQuery {
    fromCity?: string;
    toCity?: string;
    notYetStarted?: boolean;
    startDatetime: Date | null;
    endDatetime: Date | null;
    travelType: TravelType;
    pageNumber?: number;
    pageSize?: number;
    departAgency?: string;
    arrivalAgency?: string;
}