import { IAgency } from "../../agency-management/interfaces/iagency";

export interface ITravelPathDetails {
    id: string;
    agency1: IAgency;
    agency2: IAgency;
    distance: number;
    estimatedTravelDuration: string;
}