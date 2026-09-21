import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { travelTicketReqUrl } from '../utils/urls';
import { TravelTicket } from '../functionnal-views/travel-ticket-management/interfaces/travel-ticket';
import { TicketsPagedResp } from '../functionnal-views/travel-ticket-management/interfaces/tickets-paged-resp';

@Injectable({
providedIn: 'root',
})
export class TravelTicketService {
    private httpClient = inject(HttpClient);

    save(data: TravelTicketData): Observable<TravelTicket> {
        return this.httpClient.post<TravelTicket>(travelTicketReqUrl, data)
    }

    update(id: string, data: TravelTicketData): Observable<TravelTicket> {
        return this.httpClient.put<TravelTicket>(travelTicketReqUrl + id, data);
    }

    delete(id: string): Observable<any> {
        return this.httpClient.delete(travelTicketReqUrl + id);
    }

    getAllByAgency(agencyId: string, reqParams: HttpParams): Observable<TicketsPagedResp> {
        return this.httpClient.get<TicketsPagedResp>(`${travelTicketReqUrl}/agency/${agencyId}`, { params: reqParams })
    }
}