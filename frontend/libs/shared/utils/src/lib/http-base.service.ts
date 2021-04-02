import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentService } from '@workspace/shared/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HttpBaseService {
  constructor(
    private http: HttpClient,
    private environmentService: EnvironmentService
  ) {}

  get<T>(url: string, params?: { [key: string]: any }): Observable<T> {
    return this.http.get<T>(`${this.environmentService.getApiUrl()}${url}`, {
      params,
    });
  }

  post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(
      `${this.environmentService.getApiUrl()}${url}`,
      body
    );
  }

  put<T>(url: string, body: any): Observable<T> {
    return this.http.put<T>(
      `${this.environmentService.getApiUrl()}${url}`,
      body
    );
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(`${this.environmentService.getApiUrl()}${url}`);
  }

  patch<T>(url: string, body: any): Observable<T> {
    return this.http.patch<T>(
      `${this.environmentService.getApiUrl()}${url}`,
      body
    );
  }

  request<T>(method: string, endpoint: string, body: any) {
    const url = `${this.environmentService.getApiUrl()}${endpoint}`;
    const request = new HttpRequest(method, url, body);

    return this.http.request<T>(request);
  }
}
