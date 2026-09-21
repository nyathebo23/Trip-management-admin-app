import { TicketRefundExtended } from "./ticket-refund-extended";

export interface TicketRefundPagedResp {
    items: TicketRefundExtended[],
    pageNumber: number,
    pageSize: number,
    totalCount: number,
    totalPages: number,
    hasPreviousPage: boolean,
    hasNextPage: boolean
}