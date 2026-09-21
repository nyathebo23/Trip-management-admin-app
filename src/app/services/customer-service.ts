import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, switchMap } from 'rxjs';
import { customerReqUrl } from '../utils/urls';
import { getErrorType, ResponseState } from '../utils/response';
import { Customer } from '../functionnal-views/customer-management/interfaces/customer';
import { CustomerReqQuery } from '../functionnal-views/customer-management/interfaces/customer-req-query';
import { CustomerPagedResp } from '../functionnal-views/customer-management/interfaces/customer-paged-resp';


@Injectable({
providedIn: 'root',
})
export class CustomerService {
    private httpClient = inject(HttpClient);
    private refresh$ = new BehaviorSubject<CustomerReqQuery>({
        pageSize: 10,
        pageNumber: 0
    });
    
    customersResp$ = this.refresh$.pipe(
        switchMap(() => this.getAll().pipe(
            map(data => ({ data, errorType: null } satisfies ResponseState<CustomerPagedResp>)),
            catchError((err: HttpErrorResponse) => of({ data: null, errorType: getErrorType(err) }))
        )),
        
    );

    queryCustomers(query: CustomerReqQuery) {
        this.refresh$.next(query);
    }

    save(data: CustomerData): Observable<Customer> {
        return this.httpClient.post<Customer>(customerReqUrl, data)
    }

    update(id: string, data: CustomerData): Observable<Customer> {
        return this.httpClient.put<Customer>(customerReqUrl + id, data);
    }

    delete(id: string): Observable<any> {
        return this.httpClient.delete(customerReqUrl + id);
    }

    getAll(): Observable<CustomerPagedResp> {
        return this.httpClient.get<CustomerPagedResp>(customerReqUrl)
    }
}