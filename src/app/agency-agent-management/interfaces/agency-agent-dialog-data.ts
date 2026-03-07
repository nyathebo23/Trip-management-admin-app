import { Agency } from "../../models/agency";
import { IAgencyAgent } from "./iagency-agent";

export interface AgencyAgentDialogData {
    agencyAgent: IAgencyAgent;
    agencies: Agency[];
}