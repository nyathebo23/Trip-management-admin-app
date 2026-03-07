import { Agency } from "../../models/agency";
import { Bus } from "../../models/bus";
import { BusDriver } from "../../models/bus-driver";
import { ITravel } from "./travel";

export interface TravelUpdateDialogData {
    travelData: ITravel,
    agencies: Agency[],
    buses: Bus[],
    busDrivers: BusDriver[] 
}