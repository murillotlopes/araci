import { Injectable } from '@angular/core';
import { AuthSession } from './auth-session';

const ACCESS_TOKEN_EXPIRY_TOLERANCE_MS = 15_000;

const ADMIN_SESSION_KEYS = {
  accessToken: '@pin_admin_access_token',
  expiresIn: '@pin_admin_expires_in',
  authType: '@pin_admin_auth_type',
} as const;

@Injectable({ providedIn: 'root' })
export class AdminSessionService {
  private session: (AuthSession & { expiresAt: number }) | null = null;

  constructor() {
    this.removePersistedCredentials();
  }

  get accessToken(): string | null {
    if (!this.session || this.session.expiresAt <= Date.now() + ACCESS_TOKEN_EXPIRY_TOLERANCE_MS) {
      this.session = null;
      return null;
    }

    return this.session.accessToken;
  }

  get isAuthenticated(): boolean {
    return this.accessToken !== null;
  }

  save(session: AuthSession): void {
    this.session = {
      ...session,
      expiresAt: Date.now() + session.expiresIn * 1000,
    };
    this.removePersistedCredentials();
  }

  clear(): void {
    this.session = null;
    this.removePersistedCredentials();
  }

  private removePersistedCredentials(): void {
    Object.values(ADMIN_SESSION_KEYS).forEach((key) => sessionStorage.removeItem(key));
  }
}
