import { TravelType } from "../enums/travel-type";
import { WeekDays } from "../enums/week-days";

export interface TravelCreateBatchData {
        departAgencyId: string;
        travelPathId: string;
        startDate: string;
        endDate: string;
        travelHours: string[];
        days: WeekDays[];
        travelType: TravelType;
        ticketPrice: number;
        reservationFees: number;
}