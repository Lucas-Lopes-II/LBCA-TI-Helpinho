import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models';
import { Observable } from 'rxjs';
import { environment } from '../../../eviroments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  public regirter(data: Omit<User, 'id'>): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/users`, data);
  }
}
