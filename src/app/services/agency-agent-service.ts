import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, combineLatest, map, Observable, of, shareReplay, switchMap, tap } from 'rxjs';
import { agencyAgentReqUrl } from '../utils/urls';
import { AgencyAgentUpdateData } from '../agency-agent-management/interfaces/agency-agent-update-data';
import { IAgencyAgent } from '../agency-agent-management/interfaces/iagency-agent';
import { getErrorType, ResponseState } from '../utils/response';

@Injectable({
providedIn: 'root',
})
export class AgencyAgentService {
    private httpClient = inject(HttpClient);
    private refresh$ = new BehaviorSubject<void>(undefined);

    private agencyId$ = new BehaviorSubject<string | null>(null);

    agencyAgentsResp$ = combineLatest([this.agencyId$, this.refresh$])
    .pipe(
        switchMap(([agencyId]) => agencyId == null ? this.getAll().pipe(
            map(data => ({ data, errorType: null } satisfies ResponseState<IAgencyAgent[]>)),
            catchError((err: HttpErrorResponse) => of({ data: null, errorType: getErrorType(err) }))
        ) :
        this.getAllByAgency(agencyId).pipe(
            map(data => ({ data, errorType: null } satisfies ResponseState<IAgencyAgent[]>)),
            catchError((err: HttpErrorResponse) => of({ data: null, errorType: getErrorType(err) }))
        ))
    );

    save(data: AgencyAgentData): Observable<IAgencyAgent> {
        return this.httpClient.post<IAgencyAgent>(agencyAgentReqUrl, data)
        .pipe(
            tap(() => this.refresh$.next())
        );
    }

    update(id: string, data: AgencyAgentUpdateData): Observable<IAgencyAgent> {
        return this.httpClient.put<IAgencyAgent>(agencyAgentReqUrl + id, data)
        .pipe(
            tap(() => this.refresh$.next())
        );
    }

    delete(id: string): Observable<any> {
        return this.httpClient.delete(agencyAgentReqUrl + id)
        .pipe(
            tap(() => this.refresh$.next())
        );
    }

    getAllByAgency(agencyId: string): Observable<IAgencyAgent[]> {
        return this.httpClient.get<IAgencyAgent[]>(agencyAgentReqUrl + 'agency/' + agencyId)
    }

    getAll(): Observable<IAgencyAgent[]> {
        return this.httpClient.get<IAgencyAgent[]>(agencyAgentReqUrl)
    }
}