import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { busDriverReqUrl } from '../utils/urls';
import { IBusDriver } from '../bus-driver-management/interfaces/ibus-driver';
import { BusDriverData } from '../bus-driver-management/interfaces/bus-driver-data';
import { BusDriver } from '../models/bus-driver';
import { User } from '../models/user';
import { getErrorType, ResponseState } from '../utils/response';

@Injectable({
providedIn: 'root',
})
export class BusDriverService {
    private httpClient = inject(HttpClient);
    private refresh$ = new BehaviorSubject<void>(undefined);
    
    busDriversResp$ = this.getAll().pipe(
        map(data => ({ data, errorType: null } satisfies ResponseState<BusDriver[]>)),
        catchError((err: HttpErrorResponse) => of({ data: null, errorType: getErrorType(err) }))
    );
    save(data: BusDriverData): Observable<IBusDriver> {
        return this.httpClient.post<IBusDriver>(busDriverReqUrl, data)
        .pipe(
            tap(() => this.refresh$.next())
        );
    }

    update(id: string, data: BusDriverData): Observable<IBusDriver> {
        return this.httpClient.put<IBusDriver>(busDriverReqUrl + id, data)
        .pipe(
            tap(() => this.refresh$.next())
        );
    }

    delete(id: string): Observable<any> {
        return this.httpClient.delete(busDriverReqUrl + id)
        .pipe(
            tap(() => this.refresh$.next())
        );
    }

    getAll(): Observable<BusDriver[]> {
        return this.httpClient.get<IBusDriver[]>(busDriverReqUrl)
        .pipe(
            map((datas) => datas.map((driver) => {
                let user = new User('', driver.user.username, driver.user.firstname,
                    driver.user.lastname, '', driver.user.role  
                );
                return new BusDriver(driver.id, user);
            })
        ));
    }
}