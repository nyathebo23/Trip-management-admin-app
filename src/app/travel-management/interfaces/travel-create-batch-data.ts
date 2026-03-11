import { TravelType } from "../enums/travel-type";
import { WeekDays } from "../enums/week-days";

export interface TravelCreateBatchData {
        departAgencyId: string;
        arrivalAgencyId: string;
        startDate: string,
        endDate: string,
        travelHours: string[],
        days: WeekDays[]
        travelType: TravelType
}