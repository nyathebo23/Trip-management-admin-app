import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { cityReqUrl } from '../utils/urls';
import { CityData } from '../city-management/interfaces/city-data';
import { ICity } from '../city-management/interfaces/icity';

@Injectable({
  providedIn: 'root',
})
export class CityService {


  private httpClient = inject(HttpClient);

  save(data: CityData): Observable<ICity> {
    return this.httpClient.post<ICity>(cityReqUrl, data)
  }

  update(id: string, data: CityData): Observable<ICity> {
    return this.httpClient.put<ICity>(cityReqUrl + id, data);
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(cityReqUrl + id);
  }

  getAll(): Observable<ICity[]> {
    return this.httpClient.get<ICity[]>(cityReqUrl)
  }
}
