import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { jwtDecode } from 'jwt-decode';
import { UserService } from '../../shared/services';
import { environment } from '../../../eviroments/environment';
import { Credentials, SigninResponse, UserInToken } from './models';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl = environment.apiUrl;
  private authenticated: boolean = false;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly userService: UserService
  ) {}

  set accessToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  get accessToken(): string {
    return localStorage.getItem('accessToken') ?? '';
  }

  public signIn(credentials: Credentials): Observable<void> {
    return this.httpClient
      .post<SigninResponse>(`${this.baseUrl}/auth/login`, credentials)
      .pipe(
        switchMap((response: SigninResponse) => {
          this.accessToken = response.access_token;
          this.authenticated = true;
          const user = this.decodePayloadJWT();
          this.userService.user = user
            ? {
                id: user.sub,
                name: user.name,
                email: user.email,
              }
            : undefined;

          return of(undefined);
        })
      );
  }

  public signOut(): Observable<any> {
    this.authenticated = false;
    this.userService.user = undefined;
    localStorage.removeItem('accessToken');

    return of(true);
  }

  public checkIfIsAutenticated(): boolean {
    if (this.authenticated || !!this.accessToken) {
      return true;
    }

    return false;
  }

  public decodePayloadJWT(): UserInToken | undefined {
    if (this.accessToken) {
      return jwtDecode(this.accessToken) as UserInToken;
    }

    return;
  }
}
