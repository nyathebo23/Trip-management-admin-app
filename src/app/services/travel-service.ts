import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { travelReqUrl } from '../utils/urls';
import { TravelData } from '../travel-management/interfaces/travel-data';
import { ITravel } from '../travel-management/interfaces/travel';
import { TravelsPagedResp } from '../travel-management/interfaces/travels-paged-resp';
import { TravelCreateBatchData } from '../travel-management/interfaces/travel-create-batch-data';

@Injectable({
  providedIn: 'root',
})
export class TravelService {
    private httpClient = inject(HttpClient);

    save(data: TravelData): Observable<ITravel> {
        return this.httpClient.post<ITravel>(travelReqUrl, data)
    }

    saveBatch(data: TravelCreateBatchData): Observable<ITravel[]> {
        return this.httpClient.post<ITravel[]>(travelReqUrl + "custom-create", data)
    }  

    update(id: string, data: TravelData): Observable<ITravel> {
        return this.httpClient.put<ITravel>(travelReqUrl + id, data);
    }

    delete(id: string): Observable<any> {
        return this.httpClient.delete(travelReqUrl + id);
    }

    getTravelsCityToCity(reqParams: HttpParams): Observable<TravelsPagedResp> {
        return this.httpClient.get<TravelsPagedResp>(travelReqUrl + 'city-city', {
            params: reqParams
        });
    }

    getFutureTravelsByDepartAgencyId(departAgencyId: string, reqParams: HttpParams): Observable<TravelsPagedResp> {
        return this.httpClient.get<TravelsPagedResp>(travelReqUrl + 'future/fromagency/' + departAgencyId, {
            params: reqParams
        });
    }

    getCurrOrPastTravelsByDepartAgencyId(departAgencyId: string, reqParams: HttpParams): Observable<TravelsPagedResp> {
        return this.httpClient.get<TravelsPagedResp>(travelReqUrl + 'current-past/fromagency/' + departAgencyId, {
            params: reqParams
        });
    }

    getTravelsByArrivalAgencyId(arrivalAgencyId: string, reqParams: HttpParams): Observable<TravelsPagedResp> {
        return this.httpClient.get<TravelsPagedResp>(travelReqUrl + 'toagency/' + arrivalAgencyId, {
            params: reqParams
        });
    }

    getTravelsByDriverId(driverId: string, reqParams: HttpParams): Observable<TravelsPagedResp> {  
        return this.httpClient.get<TravelsPagedResp>(travelReqUrl + 'driver/' + driverId, {
            params: reqParams
        });
    }

}
