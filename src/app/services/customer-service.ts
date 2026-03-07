import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { customerReqUrl } from '../utils/urls';

@Injectable({
providedIn: 'root',
})
export class CustomerService {
    private httpClient = inject(HttpClient);

    save(data: CustomerData): Observable<Customer> {
        return this.httpClient.post<Customer>(customerReqUrl, data)
    }

    update(id: string, data: CustomerData): Observable<Customer> {
        return this.httpClient.put<Customer>(customerReqUrl + id, data);
    }

    delete(id: string): Observable<any> {
        return this.httpClient.delete(customerReqUrl + id);
    }

    getAll(): Observable<Customer[]> {
        return this.httpClient.get<Customer[]>(customerReqUrl)
    }
    }