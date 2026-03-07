import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { refundReqUrl } from '../utils/urls';

@Injectable({
providedIn: 'root',
})
export class TicketRefundService {
    private httpClient = inject(HttpClient);

    save(data: TicketRefundData): Observable<TicketRefund> {
        return this.httpClient.post<TicketRefund>(refundReqUrl, data)
    }

    update(id: string, data: TicketRefundData): Observable<TicketRefund> {
        return this.httpClient.put<TicketRefund>(refundReqUrl + id, data);
    }

    delete(id: string): Observable<any> {
        return this.httpClient.delete(refundReqUrl + id);
    }

    getAll(): Observable<TicketRefund[]> {
        return this.httpClient.get<TicketRefund[]>(refundReqUrl)
    }    
}