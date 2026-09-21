export interface TicketRefund {
    id: string,
    ticketRefNumber: string,
    paid: number,
    datetime: Date,
    reason: string,
    paymentMethod: string
}