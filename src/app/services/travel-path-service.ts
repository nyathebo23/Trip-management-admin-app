import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { TravelPathData } from '../params-entities-views/travel-path-management/interfaces/travel-path-data';
import { getErrorType, ResponseState } from '../utils/response';
import { travelPathReqUrl } from '../utils/urls';
import { TravelPathUpdateData } from '../params-entities-views/travel-path-management/interfaces/travel-path-update-data';
import { ITravelPathDetails } from '../params-entities-views/travel-path-management/interfaces/itravel-path-details';
import { TravelPathDetails } from '../models/travel-path-details';
import { IEntityAudit } from '../global/interfaces/ientity-audit';


@Injectable({
  providedIn: 'root',
})
export class TravelPathService {
    private httpClient = inject(HttpClient);
    private refresh$ = new BehaviorSubject<void>(undefined);

    travelPathsResp$ = this.refresh$.pipe(
        switchMap(() => this.getAll().pipe(
        map(data => ({ data, errorType: null } satisfies ResponseState<TravelPathDetails[]>)),
        catchError((err: HttpErrorResponse) => of({ data: null, errorType: getErrorType(err) })))
    ));

    travelPathAuditsResp$ = this.refresh$.pipe(
        switchMap(() => this.getAllAudits().pipe(
        map(data => ({ data, errorType: null } satisfies ResponseState<IEntityAudit[]>)),
        catchError((err: HttpErrorResponse) => of({ data: null, errorType: getErrorType(err) }))
    )));

    save(data: TravelPathData): Observable<ITravelPathDetails> {
        return this.httpClient.post<ITravelPathDetails>(travelPathReqUrl, data)
        .pipe(
            tap(() => this.refresh$.next())
        );
    }

    update(id: string, data: TravelPathUpdateData): Observable<ITravelPathDetails> {
        return this.httpClient.put<ITravelPathDetails>(travelPathReqUrl + id, data)
        .pipe(
            tap(() => this.refresh$.next())
        );
    }

    delete(id: string): Observable<any> {
        return this.httpClient.delete(travelPathReqUrl + id)
        .pipe(
            tap(() => this.refresh$.next())
        );
    }

    getAll(): Observable<TravelPathDetails[]> {
        return this.httpClient.get<ITravelPathDetails[]>(travelPathReqUrl)
        .pipe(
          map(items => items.map(item => TravelPathDetails.fromITravelPathDetails(item)))
        );
    }
    
    getAllAudits(): Observable<IEntityAudit[]> {
        return this.httpClient.get<IEntityAudit[]>(travelPathReqUrl + 'audits')
    }
}
