import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { busReqUrl } from '../utils/urls';
import { BusData } from '../bus-management/interfaces/bus-data';
import { IBus } from '../bus-management/interfaces/ibus';
import { Bus } from '../models/bus';

@Injectable({
providedIn: 'root',
})
export class BusService {
    private httpClient = inject(HttpClient);

    save(data: BusData): Observable<IBus> {
        return this.httpClient.post<IBus>(busReqUrl, data)
    }

    update(id: string, data: BusData): Observable<IBus> {
        return this.httpClient.put<IBus>(busReqUrl + id, data);
    }

    delete(id: string): Observable<any> {
        return this.httpClient.delete(busReqUrl + id);
    }

    getAll(): Observable<Bus[]> {
        return this.httpClient.get<IBus[]>(busReqUrl)
        .pipe(
            map((datas) => datas.map(
                (bus) => new Bus(bus.id, bus.serialNumber, bus.brand, bus.capacity, bus.usable)
            ))
        );
    }
}