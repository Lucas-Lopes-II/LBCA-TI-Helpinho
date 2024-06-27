import { inject, Injectable, Signal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models';
import { Observable } from 'rxjs';
import { LoggedUser } from '../../core/auth/models';
import { environment } from '../../../eviroments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;
  private readonly _user = signal<LoggedUser | undefined>(undefined);

  get user(): Signal<LoggedUser | undefined> {
    return this._user;
  }

  set user(user: LoggedUser | undefined) {
    this._user.set(user);
  }

  public regirter(data: Omit<User, 'id'>): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/users`, data);
  }
}
