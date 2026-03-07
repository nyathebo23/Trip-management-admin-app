import { ICity } from "../../city-management/interfaces/icity";
import { Agency } from "../../models/agency";

export interface AgencyDialogData {
    agency: Agency,
    cities: ICity[]
}