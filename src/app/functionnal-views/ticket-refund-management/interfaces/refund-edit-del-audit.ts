import { IRevision } from "../../../global/interfaces/irevision";

export interface RefundEditDelAudit {
    revision: IRevision,
    ticketRefundId: string,
    paymentMethodId: string,
    paid: number,
    reason?: string
}