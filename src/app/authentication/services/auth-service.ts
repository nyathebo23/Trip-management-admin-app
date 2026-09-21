import { inject, Injectable } from '@angular/core';
import { loginUrl } from '../../utils/urls';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/iuser';
import { jwtDecode }  from "jwt-decode";
import { ROLE } from '../../utils/roles';
import { USER_KEY } from '../../utils/constants';
import { LoginData } from '../interfaces/login-data';
import { LoginResponse } from '../interfaces/login-response';
import { TokenService } from './token-service';


interface JWTDataDecoded {
  nameid: string,
  unique_name: string,
  role: ROLE,
  nbf: number,
  exp: number,
  iat: number,
  iss: string,
  aud: string
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

    private http = inject(HttpClient);
    private tokenService = inject(TokenService);

    login(loginData: LoginData): Observable<LoginResponse> {
      return this.http.post<LoginResponse>(loginUrl, loginData);
    }

    public saveUser(token: string): IUser {
      const data: JWTDataDecoded = jwtDecode<JWTDataDecoded>(token);
      const user: IUser = {
        id: data.nameid,
        username: data.unique_name,
        role: data.role,
        enabled: true,
      }
      window.sessionStorage.removeItem(USER_KEY);
      window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
      return user;
    }

    getUser(): IUser {
      const user: IUser = JSON.parse(window.sessionStorage.getItem(USER_KEY) || '{}');
      return user;
    }

    isAuthenticated(): boolean {
      console.log(this.tokenService.getToken());
      return this.tokenService.getToken() !== null;
    }
}
