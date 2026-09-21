import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { agencyReqUrl } from '../utils/urls';
import { IAgency } from '../params-entities-views/agency-management/interfaces/iagency';
import { Agency } from '../models/agency';
import { getErrorType, ResponseState } from '../utils/response';
import { IEntityAudit } from '../global/interfaces/ientity-audit';

@Injectable({
providedIn: 'root',
})
export class AgencyService {
    private httpClient = inject(HttpClient);
    private refresh$ = new BehaviorSubject<void>(undefined);
    
    agenciesResp$ = this.refresh$.pipe(
        switchMap(() => this.getAll().pipe(
        map(data => ({ data, errorType: null } satisfies ResponseState<Agency[]>)),
        catchError((err: HttpErrorResponse) => of({ data: null, errorType: getErrorType(err) }))
    )));

    agencyAuditsResp$ = this.refresh$.pipe(
        switchMap(() => this.getAllAudits().pipe(
        map(data => ({ data, errorType: null } satisfies ResponseState<IEntityAudit[]>)),
        catchError((err: HttpErrorResponse) => of({ data: null, errorType: getErrorType(err) }))
    )));

    save(data: AgencyData): Observable<IAgency> {
        return this.httpClient.post<IAgency>(agencyReqUrl, data)
        .pipe(
            tap(() => this.refresh$.next())
        );
    }

    update(id: string, data: AgencyData): Observable<IAgency> {
        return this.httpClient.put<IAgency>(agencyReqUrl + id, data)
        .pipe(
            tap(() => this.refresh$.next())
        );
    }

    delete(id: string): Observable<any> {
        return this.httpClient.delete(agencyReqUrl + id)
        .pipe(
            tap(() => this.refresh$.next())
        );
    }

    getAll(): Observable<Agency[]> {
        return this.httpClient.get<IAgency[]>(agencyReqUrl).pipe(
            map((data) => data.map(agency => Agency.fromIAgency(agency))
            )
        );
    }

    getAllAudits(): Observable<IEntityAudit[]> {
        return this.httpClient.get<IEntityAudit[]>(agencyReqUrl + 'audits')
    }
}