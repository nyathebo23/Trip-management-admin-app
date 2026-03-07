import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { paymentMethodReqUrl } from '../utils/urls';
import { PaymentMethod } from '../payment-method-management/interfaces/payment-method';
import { PaymentMethodData } from '../payment-method-management/interfaces/payment-method-data';

@Injectable({
providedIn: 'root',
})
export class PaymentMethodService {
    private httpClient = inject(HttpClient);

    save(data: PaymentMethodData): Observable<PaymentMethod> {
        return this.httpClient.post<PaymentMethod>(paymentMethodReqUrl, data)
    }

    update(id: string, data: PaymentMethodData): Observable<PaymentMethod> {
        return this.httpClient.put<PaymentMethod>(paymentMethodReqUrl + id, data);
    }

    delete(id: string): Observable<any> {
        return this.httpClient.delete(paymentMethodReqUrl + id);
    }

    getAll(): Observable<PaymentMethod[]> {
        return this.httpClient.get<PaymentMethod[]>(paymentMethodReqUrl)
    }
}