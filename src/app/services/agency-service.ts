import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { agencyReqUrl } from '../utils/urls';
import { IAgency } from '../agency-management/interfaces/iagency';
import { Agency } from '../models/agency';
import { City } from '../models/city';

@Injectable({
providedIn: 'root',
})
export class AgencyService {
    private httpClient = inject(HttpClient);

    save(data: AgencyData): Observable<IAgency> {
        return this.httpClient.post<IAgency>(agencyReqUrl, data)
    }

    update(id: string, data: AgencyData): Observable<IAgency> {
        return this.httpClient.put<IAgency>(agencyReqUrl + id, data);
    }

    delete(id: string): Observable<any> {
        return this.httpClient.delete(agencyReqUrl + id);
    }

    getAll(): Observable<Agency[]> {
        return this.httpClient.get<IAgency[]>(agencyReqUrl).pipe(
            map((data) => data.map(agency => new Agency(
                    agency.id, agency.locationDesc, agency.quarter, 
                    new City(agency.city.id, agency.city.name)
                ))
            )
        );
    }
}