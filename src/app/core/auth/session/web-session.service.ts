import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, finalize, map, Observable, of, shareReplay, tap, throwError } from 'rxjs';
import { WEB_API_URL } from '../../http/api-url.token';
import { AuthSession } from './auth-session';
import { decodeWebAccessToken, WebAccessRequirement } from './web-access-token';

const ACCESS_TOKEN_EXPIRY_TOLERANCE_MS = 15_000;

const WEB_REFRESH_TOKEN_SIGNAL_KEY = '@pin_web_with_refresh_token';

type WebAuthSession = AuthSession & { withRefreshToken?: boolean };

@Injectable({ providedIn: 'root' })
export class WebSessionService {
  private readonly http = inject(HttpClient);
  private readonly webApiUrl = inject(WEB_API_URL);
  private session: (AuthSession & { expiresAt: number; requirement: WebAccessRequirement | null }) | null = null;
  private refreshRequest: Observable<AuthSession> | null = null;

  get accessToken(): string | null {
    if (!this.session || this.session.expiresAt <= Date.now() + ACCESS_TOKEN_EXPIRY_TOLERANCE_MS) {
      this.session = null;
      return null;
    }

    return this.session.accessToken;
  }

  get isAuthenticated(): boolean {
    return this.accessToken !== null && this.requirement === null;
  }

  get requirement(): WebAccessRequirement | null {
    return this.session?.requirement ?? null;
  }

  save(session: WebAuthSession): void {
    const payload = decodeWebAccessToken(session.accessToken);

    this.session = {
      accessToken: session.accessToken,
      expiresIn: session.expiresIn,
      authType: session.authType,
      expiresAt: Date.now() + session.expiresIn * 1000,
      requirement: payload.requirement,
    };

    if (session.withRefreshToken === true) {
      localStorage.setItem(WEB_REFRESH_TOKEN_SIGNAL_KEY, 'true');
    } else if (session.withRefreshToken === false) {
      localStorage.removeItem(WEB_REFRESH_TOKEN_SIGNAL_KEY);
    }
  }

  getValidAccessToken(): Observable<string> {
    const accessToken = this.accessToken;
    if (accessToken) return of(accessToken);
    if (!this.hasRefreshToken) return throwError(() => new Error('Sessão não pode ser restaurada.'));

    return this.refresh().pipe(map(({ accessToken: refreshedToken }) => refreshedToken));
  }

  restore(): Observable<boolean> {
    if (this.isAuthenticated) return of(true);
    if (!this.hasRefreshToken) return of(false);

    return this.getValidAccessToken().pipe(
      map(() => this.isAuthenticated),
      catchError(() => of(false)),
    );
  }

  clear(): void {
    this.session = null;
    localStorage.removeItem(WEB_REFRESH_TOKEN_SIGNAL_KEY);
  }

  private refresh(): Observable<AuthSession> {
    if (this.refreshRequest) return this.refreshRequest;

    this.refreshRequest = this.http.post<AuthSession>(`${this.webApiUrl}/auth/refresh`, null).pipe(
      tap((session) => this.save(session)),
      finalize(() => this.refreshRequest = null),
      shareReplay({ bufferSize: 1, refCount: false }),
    );

    return this.refreshRequest;
  }

  private get hasRefreshToken(): boolean {
    return localStorage.getItem(WEB_REFRESH_TOKEN_SIGNAL_KEY) === 'true';
  }
}
