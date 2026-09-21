import { IEntityAuditDetail } from "./ientity-audit-detail";


export interface IEntityAuditData {
    objectStr: string,
    clientIP: string,
    operationType: string,
    operationDatetime: Date,
    user: string,
    auditDetails: IEntityAuditDetail[]
}