import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable, Signal, signal } from '@angular/core';

import { Observable } from 'rxjs';
import {
  CreateHelpProvidedDTO,
  Help,
  HelpProvided,
  PagedList,
} from '../models';
import { environment } from '../../../eviroments/environment';
import { CreateHelpDTO } from '../models/create-help.dto';

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

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/helps/${id}`);
  }

  public createHelp(data: CreateHelpDTO): Observable<Help> {
    const formData: FormData = new FormData();
    formData.append('category', `${data.category}`);
    formData.append('deadline', `${data.deadline}`);
    formData.append('description', `${data.description}`);
    formData.append('file', data.file);
    formData.append('pixKey', `${data.pixKey}`);
    formData.append('value', `${data.value}`);
    formData.append('title', `${data.title}`);
    const headers: HttpHeaders = new HttpHeaders();
    headers.set('Content-Type', 'multipart/form-data');

    return this.http.post<Help>(`${this.baseUrl}/helps`, formData, { headers });
  }

  public getAllHelpsProvided(
    page: number,
    helpId: string
  ): Observable<PagedList<HelpProvided>> {
    let params = new HttpParams()
      .set('perPage', '100')
      .set('page', String(page));

    return this.http.get<PagedList<HelpProvided>>(
      `${this.baseUrl}/helps/provided/by-help/${helpId}`,
      { params }
    );
  }

  public createHelpProvided(data: CreateHelpProvidedDTO): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/helps/provided`, data);
  }

  public getAllByUserHelped(
    page: number,
    userHelpedId: string
  ): Observable<PagedList<Help>> {
    let params = new HttpParams()
      .set('perPage', '10')
      .set('page', String(page));

    return this.http.get<PagedList<Help>>(
      `${this.baseUrl}/helps/by-user-helped/${userHelpedId}`,
      { params }
    );
  }
}
