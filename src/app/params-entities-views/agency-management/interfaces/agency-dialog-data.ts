import { Agency } from "../../../models/agency";
import { City } from "../../../models/city";

export interface AgencyDialogData {
    agency: Agency,
    cities: City[]
}