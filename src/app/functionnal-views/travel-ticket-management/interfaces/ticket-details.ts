export interface TicketDetails {
    id: string,
    refNumber: string,
    ticketType: string,
    issuanceDatetime: Date,
    paid: number,
    paymentMethod: string,
    customerFullname: string,
    agency: string,
    used: boolean,
    refund: boolean
    
}