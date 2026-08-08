import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WEB_API_URL } from '../../../../../core/http/api-url.token';
import { WebRegistrationInput } from './web-registration.dto';

@Injectable({ providedIn: 'root' })
export class WebRegistrationApi {
  private readonly http = inject(HttpClient);
  private readonly webApiUrl = inject(WEB_API_URL);

  register(input: WebRegistrationInput): Observable<null> {
    return this.http.post<null>(`${this.webApiUrl}/user/register`, input);
  }
}
