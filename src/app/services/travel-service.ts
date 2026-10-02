import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { travelReqUrl } from '../utils/urls';
import { TravelData } from '../functionnal-views/travel-management/interfaces/travel-data';
import { ITravel } from '../functionnal-views/travel-management/interfaces/travel';
import { TravelsPagedResp } from '../functionnal-views/travel-management/interfaces/travels-paged-resp';
import { TravelCreateBatchData } from '../functionnal-views/travel-management/interfaces/travel-create-batch-data';
import { mapUtcDateFields } from '../utils/api-date';

const travelDateFields = ['plannedDepartDatetime', 'effectiveDepartDatetime', 'arrivalDatetime'] as const;

function mapTravelDates(travel: ITravel): ITravel {
    return mapUtcDateFields(travel, travelDateFields);
}

function mapPagedTravelDates(response: TravelsPagedResp): TravelsPagedResp {
    return { ...response, items: response.items.map(mapTravelDates) };
}

@Injectable({
  providedIn: 'root',
})
export class TravelService {
    private httpClient = inject(HttpClient);
    private readonly _scheduleRefresh = signal(0);
    readonly scheduleRefresh = this._scheduleRefresh.asReadonly();

    save(data: TravelData): Observable<ITravel> {
        return this.httpClient.post<ITravel>(travelReqUrl, data).pipe(
            map(mapTravelDates),
            tap(() => this._scheduleRefresh.update(version => version + 1))
        );
    }

    saveBatch(data: TravelCreateBatchData): Observable<ITravel[]> {
        return this.httpClient.post<ITravel[]>(travelReqUrl + "custom-create", data)
            .pipe(map(travels => travels.map(mapTravelDates)));
    }  

    update(id: string, data: TravelData): Observable<ITravel> {
        return this.httpClient.put<ITravel>(travelReqUrl + id, data).pipe(
            map(mapTravelDates),
            tap(() => this._scheduleRefresh.update(version => version + 1))
        );
    }

    delete(id: string): Observable<any> {
        return this.httpClient.delete(travelReqUrl + id);
    }

    getTravelsCityToCity(reqParams: HttpParams): Observable<TravelsPagedResp> {
        return this.httpClient.get<TravelsPagedResp>(travelReqUrl + 'city-city', {
            params: reqParams
        }).pipe(map(mapPagedTravelDates));
    }

    getFutureTravelsByDepartAgencyId(departAgencyId: string, reqParams: HttpParams): Observable<TravelsPagedResp> {
        return this.httpClient.get<TravelsPagedResp>(travelReqUrl + 'future/fromagency/' + departAgencyId, {
            params: reqParams
        }).pipe(
            map(mapPagedTravelDates)
        );
    }

    getFutureTravels(reqParams: HttpParams): Observable<TravelsPagedResp> {
        return this.httpClient.get<TravelsPagedResp>(travelReqUrl + 'future', {
            params: reqParams
        }).pipe(
            map(mapPagedTravelDates)
        );
    }

    getCurrOrPastTravelsByDepartAgencyId(departAgencyId: string, reqParams: HttpParams): Observable<TravelsPagedResp> {
        return this.httpClient.get<TravelsPagedResp>(travelReqUrl + 'current-past/fromagency/' + departAgencyId, {
            params: reqParams
        }).pipe(map(mapPagedTravelDates));
    }

    getTravelsByArrivalAgencyId(arrivalAgencyId: string, reqParams: HttpParams): Observable<TravelsPagedResp> {
        return this.httpClient.get<TravelsPagedResp>(travelReqUrl + 'toagency/' + arrivalAgencyId, {
            params: reqParams
        }).pipe(map(mapPagedTravelDates));
    }

    getTravelsByDriverId(driverId: string, reqParams: HttpParams): Observable<TravelsPagedResp> {  
        return this.httpClient.get<TravelsPagedResp>(travelReqUrl + 'driver/' + driverId, {
            params: reqParams
        }).pipe(map(mapPagedTravelDates));
    }

}
