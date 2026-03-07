import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { busDriverReqUrl } from '../utils/urls';
import { IBusDriver } from '../bus-driver-management/interfaces/ibus-driver';
import { BusDriverData } from '../bus-driver-management/interfaces/bus-driver-data';
import { BusDriver } from '../models/bus-driver';
import { User } from '../models/user';

@Injectable({
providedIn: 'root',
})
export class BusDriverService {
    private httpClient = inject(HttpClient);

    save(data: BusDriverData): Observable<IBusDriver> {
        return this.httpClient.post<IBusDriver>(busDriverReqUrl, data)
    }

    update(id: string, data: BusDriverData): Observable<IBusDriver> {
        return this.httpClient.put<IBusDriver>(busDriverReqUrl + id, data);
    }

    delete(id: string): Observable<any> {
        return this.httpClient.delete(busDriverReqUrl + id);
    }

    getAll(): Observable<BusDriver[]> {
        return this.httpClient.get<IBusDriver[]>(busDriverReqUrl)
        .pipe(
            map((datas) => datas.map((driver) => {
                let user = new User('', driver.user.username, driver.user.firstname,
                    driver.user.lastname, '', driver.user.role  
                );
                return new BusDriver(driver.id, user);
            })
        ));
    }
}