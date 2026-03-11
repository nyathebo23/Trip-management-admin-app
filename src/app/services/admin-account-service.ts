import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, shareReplay, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { accountReqUrl } from '../utils/urls';
import { IUser } from '../authentication/interfaces/iuser';
import { UserUpdateData } from '../authentication/interfaces/user-update-data';
import { getErrorType, ResponseState } from '../utils/response';

@Injectable({
    providedIn: 'root',
})
export class AdminAccountService {
    private httpClient = inject(HttpClient);
    private refresh$ = new BehaviorSubject<void>(undefined);

    adminAccountsResp$ = this.refresh$.pipe(
        switchMap(() => this.getAll().pipe(
            map(data => ({ data, errorType: null } satisfies ResponseState<IUser[]>)),
            catchError((err: HttpErrorResponse) => of({ data: null, errorType: getErrorType(err) }))
        )),
        shareReplay({ bufferSize: 1, refCount: true })   // cache + unsubscribe auto si plus personne écoute
    );

    save(data: AdminAccountData): Observable<IUser> {
        return this.httpClient.post<IUser>(accountReqUrl + "register", data)
        .pipe(
            tap(() => this.refresh$.next())
        );
    }

    update(id: string, data: UserUpdateData): Observable<IUser> {
        return this.httpClient.put<IUser>(accountReqUrl + id, data)
        .pipe(
            tap(() => this.refresh$.next())
        );
    }

    delete(id: string): Observable<any> {
        return this.httpClient.delete(accountReqUrl + id)
        .pipe(
            tap(() => this.refresh$.next())
        );
    }

    getAll(): Observable<IUser[]> {
        return this.httpClient.get<IUser[]>(accountReqUrl)
    }

}