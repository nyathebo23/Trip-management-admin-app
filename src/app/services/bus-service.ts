import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { busReqUrl } from '../utils/urls';
import { BusData } from '../params-entities-views/bus-management/interfaces/bus-data';
import { IBus } from '../params-entities-views/bus-management/interfaces/ibus';
import { Bus } from '../models/bus';
import { getErrorType, ResponseState } from '../utils/response';
import { IEntityAudit } from '../global/interfaces/ientity-audit';

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

    busAuditsResp$ = this.refresh$.pipe(
        switchMap(() => this.getAllAudits().pipe(
        map(data => ({ data, errorType: null } satisfies ResponseState<IEntityAudit[]>)),
        catchError((err: HttpErrorResponse) => of({ data: null, errorType: getErrorType(err) }))
    )));

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
            map((datas) => datas.map((bus) => Bus.fromIBus(bus)))
        );
    }

    getAllAudits(): Observable<IEntityAudit[]> {
        return this.httpClient.get<IEntityAudit[]>(busReqUrl + 'audits')
    }
}