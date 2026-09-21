import { IUser } from "../../authentication/interfaces/iuser";
import { IEntityAuditDetail } from "./ientity-audit-detail";

export enum OperationType {
    CREATE,
    UPDATE,
    DELETE
}

export interface IEntityAudit {
    entityId: string,
    entityName: string,
    clientIP: string,
    operationType: OperationType,
    operationDatetime: Date,
    user: IUser,
    auditDetails: IEntityAuditDetail[]
}