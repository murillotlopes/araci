import { Injectable } from '@angular/core';
import { AuthSession } from './auth-session';

const ADMIN_SESSION_KEYS = {
  accessToken: '@pin_admin_access_token',
  expiresIn: '@pin_admin_expires_in',
  authType: '@pin_admin_auth_type',
} as const;

@Injectable({ providedIn: 'root' })
export class AdminSessionService {
  get accessToken(): string | null {
    return sessionStorage.getItem(ADMIN_SESSION_KEYS.accessToken);
  }

  get isAuthenticated(): boolean {
    return this.accessToken !== null;
  }

  save(session: AuthSession): void {
    sessionStorage.setItem(ADMIN_SESSION_KEYS.accessToken, session.accessToken);
    sessionStorage.setItem(ADMIN_SESSION_KEYS.expiresIn, String(session.expiresIn));
    sessionStorage.setItem(ADMIN_SESSION_KEYS.authType, session.authType);
  }

  clear(): void {
    Object.values(ADMIN_SESSION_KEYS).forEach((key) => sessionStorage.removeItem(key));
  }
}
