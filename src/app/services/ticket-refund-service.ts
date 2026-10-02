import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { refundReqUrl } from '../utils/urls';
import { TicketRefundData } from '../functionnal-views/ticket-refund-management/interfaces/ticket-refund-data';
import { TicketRefund } from '../functionnal-views/ticket-refund-management/interfaces/ticket-refund';
import { TicketRefundExtended } from '../functionnal-views/ticket-refund-management/interfaces/ticket-refund-extended';
import { TicketRefundPagedResp } from '../functionnal-views/ticket-refund-management/interfaces/ticket-refund-paged-resp';
import { mapUtcDateFields } from '../utils/api-date';
import { TravelTicket } from '../functionnal-views/travel-ticket-management/interfaces/travel-ticket';

function mapRefundDates(refund: TicketRefund): TicketRefund {
    return mapUtcDateFields(refund, ['datetime']);
}

function mapExtendedRefundDates(refund: TicketRefundExtended): TicketRefundExtended {
    return {
        ...mapUtcDateFields(refund, ['datetime']),
        ticket: mapUtcDateFields(refund.ticket, ['issuanceDatetime', 'setAsUsedAt']) as TravelTicket,
    };
}

function mapPagedRefundDates(response: TicketRefundPagedResp): TicketRefundPagedResp {
    return { ...response, items: response.items.map(mapExtendedRefundDates) };
}

@Injectable({
providedIn: 'root',
})
export class TicketRefundService {
    private httpClient = inject(HttpClient);

    save(data: TicketRefundData): Observable<TicketRefund> {
        return this.httpClient.post<TicketRefund>(refundReqUrl, data).pipe(map(mapRefundDates));
    }

    update(id: string, data: TicketRefundData): Observable<TicketRefund> {
        return this.httpClient.put<TicketRefund>(refundReqUrl + id, data).pipe(map(mapRefundDates));
    }

    delete(id: string): Observable<any> {
        return this.httpClient.delete(refundReqUrl + id);
    }

    getAll(): Observable<TicketRefundPagedResp> {
        return this.httpClient.get<TicketRefundPagedResp>(refundReqUrl).pipe(map(mapPagedRefundDates));
    }  

    getAllByAgency(agencyId: string): Observable<TicketRefundPagedResp> {
        return this.httpClient.get<TicketRefundPagedResp>(refundReqUrl + 'agency/' + agencyId)
            .pipe(map(mapPagedRefundDates));
    }    
}