import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, Signal, signal } from '@angular/core';

import { Observable } from 'rxjs';
import { Help, PagedList } from '../models';
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
      .set('select', 'id,name,supertype,rules,set,number,images,types')
      .set('orderBy', 'name')
      .set('perPage', '10')
      .set('page', String(page));

    return this.http.get<PagedList<Help>>(`${this.baseUrl}/helps`, { params });
  }
}
