import { Injectable } from '@angular/core';
import { TOKEN_KEY } from '../../utils/constants';


@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && !!window.sessionStorage;
  }

  logout(): void {
    if (!this.isBrowser()) return;
    try {
      window.sessionStorage.clear();
    } catch {
      // noop on SSR or if sessionStorage is not available
    }
  }

  public saveToken(token: string): void {
    if (!this.isBrowser()) return;
    try {
      window.sessionStorage.removeItem(TOKEN_KEY);
      window.sessionStorage.setItem(TOKEN_KEY, token);
    } catch {
      // noop
    }
  }

  public getToken(): string | null {
    if (!this.isBrowser()) return null;
    try {
      return window.sessionStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  }

}
