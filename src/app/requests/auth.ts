import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private baseUrl = environment.baseUrl

  constructor(
    private http: HttpClient
  ) { }

  login(payload: { email: string, password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.baseUrl, payload)
  }

}
