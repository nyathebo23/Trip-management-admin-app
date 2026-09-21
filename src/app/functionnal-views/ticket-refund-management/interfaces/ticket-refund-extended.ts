import { TravelTicket } from "../../travel-ticket-management/interfaces/travel-ticket";

export interface TicketRefundExtended {
    id: string,
    paid: number,
    datetime: Date,
    paymentMethodId: string,
    reason: string,
    ticket: TravelTicket
}

