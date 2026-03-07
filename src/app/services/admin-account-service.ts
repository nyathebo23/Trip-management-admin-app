import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { accountReqUrl } from '../utils/urls';
import { IUser } from '../authentication/interfaces/iuser';
import { UserUpdateData } from '../authentication/interfaces/user-update-data';

@Injectable({
providedIn: 'root',
})
export class AdminAccountService {
    private httpClient = inject(HttpClient);

    save(data: AdminAccountData): Observable<IUser> {
        return this.httpClient.post<IUser>(accountReqUrl, data)
    }

    update(id: string, data: UserUpdateData): Observable<IUser> {
        return this.httpClient.put<IUser>(accountReqUrl + id, data);
    }

    delete(id: string): Observable<any> {
        return this.httpClient.delete(accountReqUrl + id);
    }

    getAll(): Observable<IUser[]> {
        return this.httpClient.get<IUser[]>(accountReqUrl)
    }
}