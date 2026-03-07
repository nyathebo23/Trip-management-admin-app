import { HttpErrorResponse } from "@angular/common/http";
import { catchError, map, Observable, of } from "rxjs";

export type ResponseState<T> = {
  data: T | null;
  errorType: 'network' | 'unauthorized' | 'badrequest' | 'forbidden' | 'server' | 'notfound' | 'unknown' | null;
};

export function getErrorType(err: HttpErrorResponse): ResponseState<any>['errorType'] {
  if (err.status === 0) return 'network';
  if (err.status === 400) return 'badrequest';
  if (err.status === 404) return 'network';
  if (err.status === 401) return 'unauthorized';
  if (err.status === 403) return 'forbidden'; 
  if (err.status >= 500) return 'server';
  return 'unknown';
}

export function getErrorMessage(error: HttpErrorResponse): string {
    if (error.status === 401) {
      return error.error?.message || 'You have to be authenticated to perform this action !';
    }
    else if (error.status === 400) {
      return error.error?.message || 'Invalid data provided !';
    }
      else if (error.status === 0) {
      return 'Unable to connect to the server. Please check your network connection and try again.';
    } else {
      return 'An unexpected error occurred. Please try again later.';
    }
}

export function toResponseState<T>(resp: Observable<T[]>): Observable<ResponseState<T[]>> {
  return resp.pipe(
    map(data => ({
      data,
      errorType: null
    } satisfies ResponseState<T[]>)),
    catchError((err: HttpErrorResponse) =>
      of({
        data: null,
        errorType: getErrorType(err)
      })
    )
  );
}