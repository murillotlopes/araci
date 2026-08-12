import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WEB_API_URL } from '../../../../core/http/api-url.token';
import { WebSignInInput, WebSignInOutput } from './web-auth.dto';

@Injectable({ providedIn: 'root' })
export class WebAuthApi {
  private readonly http = inject(HttpClient);
  private readonly webApiUrl = inject(WEB_API_URL);

  signIn(input: WebSignInInput): Observable<WebSignInOutput> {
    return this.http.post<WebSignInOutput>(`${this.webApiUrl}/auth/signin`, input, {
      // Permite receber o refresh token por Set-Cookie. O Path do cookie
      // impede seu envio fora de /web/auth/refresh.
      withCredentials: true,
    });
  }
}
