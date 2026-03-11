import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { paymentMethodReqUrl } from '../utils/urls';
import { PaymentMethod } from '../payment-method-management/interfaces/payment-method';
import { PaymentMethodData } from '../payment-method-management/interfaces/payment-method-data';
import { getErrorType, ResponseState } from '../utils/response';

@Injectable({
providedIn: 'root',
})
export class PaymentMethodService {
    private httpClient = inject(HttpClient);
    private refresh$ = new BehaviorSubject<void>(undefined);

    paymentMethodsResp$ = this.refresh$.pipe(
        switchMap(() => this.getAll().pipe(
        map(data => ({ data, errorType: null } satisfies ResponseState<PaymentMethod[]>)),
        catchError((err: HttpErrorResponse) => of({ data: null, errorType: getErrorType(err) }))
    ))); 

    save(data: PaymentMethodData): Observable<PaymentMethod> {
        return this.httpClient.post<PaymentMethod>(paymentMethodReqUrl, data)
        .pipe(
            tap(() => this.refresh$.next())
        );
    }

    update(id: string, data: PaymentMethodData): Observable<PaymentMethod> {
        return this.httpClient.put<PaymentMethod>(paymentMethodReqUrl + id, data)
        .pipe(
            tap(() => this.refresh$.next())
        );
    }

    delete(id: string): Observable<any> {
        return this.httpClient.delete(paymentMethodReqUrl + id)
        .pipe(
            tap(() => this.refresh$.next())
        );
    }

    getAll(): Observable<PaymentMethod[]> {
        return this.httpClient.get<PaymentMethod[]>(paymentMethodReqUrl)
    }
}