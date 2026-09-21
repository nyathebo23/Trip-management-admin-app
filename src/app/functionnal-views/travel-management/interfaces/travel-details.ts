import { ITravel } from "./travel";

export interface TravelDetails {
    id: string;
    departAgency: string;
    arrivalAgency: string;
    bus?: string;
    busDriver?: string;
    plannedDepartDatetime: Date;
    effectiveDepartDatetime?: Date;
    arrivalDatetime?: Date;
    travelType: string;
    travelState: string;
    ticketPrice: number;
    reservationFees: number;
    travelItem?: ITravel
}