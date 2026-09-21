export interface TicketRefundDetails {
    id: string,
    refNumber: string,
    ticketType: string,
    issuanceDatetime: Date,
    ticketPrice: number,
    ticketPaymentMethod: string,
    refundPaymentMethod: string,
    refundReason: string,
    amountRefunded: number,
    customerFullname: string,
    agency: string,
}