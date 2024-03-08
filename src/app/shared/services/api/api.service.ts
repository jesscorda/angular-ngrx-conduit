import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import type { Observable } from 'rxjs';
import { baseUrl } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private _http = inject(HttpClient);

  get<T>(url: string, queryParams?: Record<string, string | number | boolean>): Observable<T> {
    return this._http.get<T>(`${baseUrl}/${url}`, {
      params: queryParams ? this._toHttpParams(queryParams) : undefined,
    });
  }

  post<T, D>(url: string, payload?: D): Observable<T> {
    return this._http.post<T>(`${baseUrl}/${url}`, payload);
  }

  put<T, D>(url: string, payload: D): Observable<T> {
    return this._http.put<T>(`${baseUrl}/${url}`, payload);
  }

  delete<T>(url: string): Observable<T> {
    return this._http.delete<T>(`${baseUrl}/${url}`);
  }

  private _toHttpParams(params: Record<string, string | number | boolean>) {
    return Object.getOwnPropertyNames(params).reduce(
      (p, key) => p.set(key, params[key]),
      new HttpParams(),
    );
  }
}
