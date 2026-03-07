import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { travelTicketReqUrl } from '../utils/urls';

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

    getAll(): Observable<TravelTicket[]> {
        return this.httpClient.get<TravelTicket[]>(travelTicketReqUrl)
    }
}