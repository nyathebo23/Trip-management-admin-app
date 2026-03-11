import { ROLE } from "../../utils/roles";

export interface IAgencyAgent {
    id: string,
    user: {
        firstname: string,
        lastname: string,
        username: string,
        role: ROLE
    },
    agencyId: string,
}