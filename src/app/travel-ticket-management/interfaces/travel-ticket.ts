interface TravelTicket {
    id: string,
    refNumber: string,
    ticketType: string,
    issuanceDatetime: Date,
    paid: number,
    paymentMethod: string,
    customerId: string,
    customerFullname: string,
    agencyId: string,
    travelId: string,
    used: boolean,
    refund: boolean
}