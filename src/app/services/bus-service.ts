import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { busReqUrl } from '../utils/urls';
import { BusData } from '../bus-management/interfaces/bus-data';
import { IBus } from '../bus-management/interfaces/ibus';
import { Bus } from '../models/bus';
import { getErrorType, ResponseState } from '../utils/response';

@Injectable({
providedIn: 'root',
})
export class BusService {
    private httpClient = inject(HttpClient);
    private refresh$ = new BehaviorSubject<void>(undefined);

    busesResp$ = this.refresh$.pipe(
        switchMap(() => this.getAll().pipe(
        map(data => ({ data, errorType: null } satisfies ResponseState<IBus[]>)),
        catchError((err: HttpErrorResponse) => of({ data: null, errorType: getErrorType(err) })))
    ));

    save(data: BusData): Observable<IBus> {
        return this.httpClient.post<IBus>(busReqUrl, data)
        .pipe(
            tap(() => this.refresh$.next())
        );
    }

    update(id: string, data: BusData): Observable<IBus> {
        return this.httpClient.put<IBus>(busReqUrl + id, data)
        .pipe(
            tap(() => this.refresh$.next())
        );
    }

    delete(id: string): Observable<any> {
        return this.httpClient.delete(busReqUrl + id)
        .pipe(
            tap(() => this.refresh$.next())
        );
    }

    getAll(): Observable<Bus[]> {
        return this.httpClient.get<IBus[]>(busReqUrl)
        .pipe(
            map((datas) => datas.map(
                (bus) => new Bus(bus.id, bus.serialNumber, bus.brand, bus.capacity, bus.usable)
            ))
        );
    }
}