import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { travelTicketReqUrl } from '../utils/urls';
import { TravelTicket } from '../functionnal-views/travel-ticket-management/interfaces/travel-ticket';
import { TicketsPagedResp } from '../functionnal-views/travel-ticket-management/interfaces/tickets-paged-resp';
import { mapUtcDateFields } from '../utils/api-date';

function mapTicketDates(ticket: TravelTicket): TravelTicket {
    return mapUtcDateFields(ticket, ['issuanceDatetime', 'setAsUsedAt']);
}

@Injectable({
providedIn: 'root',
})
export class TravelTicketService {
    private httpClient = inject(HttpClient);

    save(data: TravelTicketData): Observable<TravelTicket> {
        return this.httpClient.post<TravelTicket>(travelTicketReqUrl, data).pipe(map(mapTicketDates));
    }

    update(id: string, data: TravelTicketData): Observable<TravelTicket> {
        return this.httpClient.put<TravelTicket>(travelTicketReqUrl + id, data).pipe(map(mapTicketDates));
    }

    delete(id: string): Observable<any> {
        return this.httpClient.delete(travelTicketReqUrl + id);
    }

    getAllByAgency(agencyId: string, reqParams: HttpParams): Observable<TicketsPagedResp> {
        return this.httpClient.get<TicketsPagedResp>(`${travelTicketReqUrl}/agency/${agencyId}`, { params: reqParams })
            .pipe(map(response => ({ ...response, items: response.items.map(mapTicketDates) })));
    }
}