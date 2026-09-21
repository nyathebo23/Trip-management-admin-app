import { TicketType } from "./ticket-type";

export interface TravelTicket {
    id: string,
    refNumber: string,
    ticketType: TicketType,
    issuanceDatetime: Date,
    setAsUsedAt?: Date,
    paid: number,
    paymentMethodId: string,
    customerId: string,
    customerFullname: string,
    agencyId: string,
    travelId: string,
    used: boolean,
    refund: boolean
}