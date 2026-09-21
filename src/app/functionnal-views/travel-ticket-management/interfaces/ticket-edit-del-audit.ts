import { IRevision } from "../../../global/interfaces/irevision";
import { TravelTicket } from "./travel-ticket";

export interface TicketEditDelAudit {
    revision: IRevision,
    ticketData: TravelTicket

}