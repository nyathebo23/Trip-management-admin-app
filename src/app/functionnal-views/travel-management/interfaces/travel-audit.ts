import { IRevision } from "../../../global/interfaces/irevision";
import { ITravel } from "./travel";

export interface TravelAudit {
    revision: IRevision,
    travelData: ITravel
}