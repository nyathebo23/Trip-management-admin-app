import { IRevision } from "../../../global/interfaces/irevision";

export interface AdminAccountAudit {
    revision: IRevision,
    username: string,
    firstname?: string,
    lastname?: string
}