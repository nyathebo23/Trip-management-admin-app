import { TravelTicket } from "./travel-ticket"

export interface TicketsPagedResp {
    items: TravelTicket[],
    pageNumber: number,
    pageSize: number,
    totalCount: number,
    totalPages: number,
    hasPreviousPage: boolean,
    hasNextPage: boolean
}