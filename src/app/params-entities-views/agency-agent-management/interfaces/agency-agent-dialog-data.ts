import { Agency } from "../../../models/agency";
import { AgencyAgent } from "../../../models/agency-agent";

export interface AgencyAgentDialogData {
    agencyAgent: AgencyAgent;
    agencies: Agency[];
}