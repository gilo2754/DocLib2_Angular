import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { API_URL } from '../../app.constants';
import { JwtResponse } from './jwt-response.interface';
import { AuthenticationRequest } from './jwt-request.interface';

export const TOKEN = 'token';
export const AUTHENTICATED_USER = 'authenticaterUser';

@Injectable({
  providedIn: 'root'
})
export class JwtAuthenticationService {
  constructor(private http: HttpClient) {}

  executeJWTAuthenticationService(authRequest: AuthenticationRequest): Observable<JwtResponse> {
    return this.http
      .post<JwtResponse>(`${API_URL}/authenticate`, authRequest)
      .pipe(
        map(response => {
          sessionStorage.setItem(AUTHENTICATED_USER, authRequest.email);
          sessionStorage.setItem(TOKEN, response.token);
          return response;
        })
      );
  }

  getAuthenticatedUser(): string | null {
    return sessionStorage.getItem(AUTHENTICATED_USER);
  }

  getAuthenticatedToken(): string | null {
    return sessionStorage.getItem(TOKEN);
  }

  isUserLoggedIn(): boolean {
    return !!this.getAuthenticatedUser();
  }

  logout(): void {
    sessionStorage.removeItem(AUTHENTICATED_USER);
    sessionStorage.removeItem(TOKEN);
  }

  setAuthenticationToken(token: string): void {
    sessionStorage.setItem(TOKEN, token);
  }
  
}
