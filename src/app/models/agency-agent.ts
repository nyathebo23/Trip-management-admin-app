import { IAgencyAgent } from "../params-entities-views/agency-agent-management/interfaces/iagency-agent";
import { Entity } from "../global/interfaces/entity";
import { User } from "./user";

export class AgencyAgent implements Entity {
    constructor(public id: string, public user: User, public agencyId: string)
    {}

    toString() {
        return this.user.toString();
    }

    getId(): string {
        return this.id;
    }

    static fromIAgencyAgent(agencyAgent: IAgencyAgent): AgencyAgent {
        return new AgencyAgent(
            agencyAgent.id,
            User.fromIUser(agencyAgent.user),
            agencyAgent.agencyId
        );
    }

}
   