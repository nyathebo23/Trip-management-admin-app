import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { cityReqUrl } from '../utils/urls';
import { CityData } from '../city-management/interfaces/city-data';
import { ICity } from '../city-management/interfaces/icity';
import { getErrorType, ResponseState } from '../utils/response';

@Injectable({
  providedIn: 'root',
})
export class CityService {

  private httpClient = inject(HttpClient);
  private refresh$ = new BehaviorSubject<void>(undefined);

  citiesResp$ = this.refresh$.pipe(
    switchMap(() => this.getAll().pipe(
      map(data => ({
        data,
        errorType: null
      } satisfies ResponseState<ICity[]>)),

      catchError((err: HttpErrorResponse) =>
        of({
          data: null,
          errorType: getErrorType(err)
        })
      )
    ))
  ); 

  save(data: CityData): Observable<ICity> {
    return this.httpClient.post<ICity>(cityReqUrl, data)
    .pipe(
        tap(() => this.refresh$.next())
    );
  }

  update(id: string, data: CityData): Observable<ICity> {
    return this.httpClient.put<ICity>(cityReqUrl + id, data)
    .pipe(
        tap(() => this.refresh$.next())
    );
  }

  getAll(): Observable<ICity[]> {
    return this.httpClient.get<ICity[]>(cityReqUrl)
  }
}
