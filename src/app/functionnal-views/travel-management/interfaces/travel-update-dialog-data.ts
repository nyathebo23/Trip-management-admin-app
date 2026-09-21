import { Bus } from "../../../models/bus";
import { BusDriver } from "../../../models/bus-driver";
import { TravelPathDetails } from "../../../models/travel-path-details";
import { ITravel } from "./travel";

export interface TravelUpdateDialogData {
    travelData: ITravel,
    travelPaths: TravelPathDetails[],
    buses: Bus[],
    busDrivers: BusDriver[] 
}