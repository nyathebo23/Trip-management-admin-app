import { ICity } from "../../city-management/interfaces/icity";

export interface IAgency {
    id: string,
    locationDesc: string,
    quarter: string,
    city: ICity,
}