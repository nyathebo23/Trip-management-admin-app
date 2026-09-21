import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { refundReqUrl } from '../utils/urls';
import { TicketRefundData } from '../functionnal-views/ticket-refund-management/interfaces/ticket-refund-data';
import { TicketRefund } from '../functionnal-views/ticket-refund-management/interfaces/ticket-refund';
import { TicketRefundExtended } from '../functionnal-views/ticket-refund-management/interfaces/ticket-refund-extended';
import { TicketRefundPagedResp } from '../functionnal-views/ticket-refund-management/interfaces/ticket-refund-paged-resp';

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

    getAll(): Observable<TicketRefundPagedResp> {
        return this.httpClient.get<TicketRefundPagedResp>(refundReqUrl)
    }  

    getAllByAgency(agencyId: string): Observable<TicketRefundPagedResp> {
        return this.httpClient.get<TicketRefundPagedResp>(refundReqUrl + 'agency/' + agencyId)
    }    
}