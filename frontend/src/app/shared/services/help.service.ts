import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, Signal, signal } from '@angular/core';

import { Observable } from 'rxjs';
import { Help, HelpProvided, PagedList } from '../models';
import { environment } from '../../../eviroments/environment';

@Injectable({
  providedIn: 'root',
})
export class HelpService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;
  private readonly _help = signal<Help | undefined>(undefined);

  get help(): Signal<Help | undefined> {
    return this._help;
  }

  set help(help: Help | undefined) {
    this._help.set(help);
  }

  public getAll(page: number): Observable<PagedList<Help>> {
    let params = new HttpParams()
      .set('perPage', '10')
      .set('page', String(page));

    return this.http.get<PagedList<Help>>(`${this.baseUrl}/helps`, { params });
  }

  public getById(id: string): Observable<Help> {
    return this.http.get<Help>(`${this.baseUrl}/helps/${id}`);
  }

  public getAllHelpsProvided(page: number, helpId: string): Observable<PagedList<HelpProvided>> {
    let params = new HttpParams()
      .set('perPage', '10')
      .set('page', String(page));

    return this.http.get<PagedList<HelpProvided>>(`${this.baseUrl}/helps/provided/by-help/${helpId}`, { params });
  }
}
