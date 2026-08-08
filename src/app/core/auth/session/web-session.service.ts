import { Injectable } from '@angular/core';
import { AuthSession } from './auth-session';

const WEB_SESSION_KEYS = {
  accessToken: '@pin_web_access_token',
  expiresIn: '@pin_web_expires_in',
  authType: '@pin_web_auth_type',
  navigation: '@pin_web_navigation',
} as const;

const LEGACY_WEB_SESSION_KEYS = {
  accessToken: '@pin_token',
  expiresIn: '@pin_expiresIn',
  authType: '@pin_authType',
  navigation: '@pin_menu',
} as const;

@Injectable({ providedIn: 'root' })
export class WebSessionService {
  get accessToken(): string | null {
    return (
      sessionStorage.getItem(WEB_SESSION_KEYS.accessToken) ??
      sessionStorage.getItem(LEGACY_WEB_SESSION_KEYS.accessToken)
    );
  }

  get isAuthenticated(): boolean {
    return this.accessToken !== null;
  }

  save(session: AuthSession): void {
    sessionStorage.setItem(WEB_SESSION_KEYS.accessToken, session.accessToken);
    sessionStorage.setItem(WEB_SESSION_KEYS.expiresIn, String(session.expiresIn));
    sessionStorage.setItem(WEB_SESSION_KEYS.authType, session.authType);
    this.removeLegacyAuthKeys();
  }

  saveNavigation<T>(items: T[]): void {
    sessionStorage.setItem(WEB_SESSION_KEYS.navigation, JSON.stringify(items));
    sessionStorage.removeItem(LEGACY_WEB_SESSION_KEYS.navigation);
  }

  getNavigation<T>(): T[] | null {
    const storedNavigation =
      sessionStorage.getItem(WEB_SESSION_KEYS.navigation) ??
      sessionStorage.getItem(LEGACY_WEB_SESSION_KEYS.navigation);

    if (!storedNavigation) return null;

    try {
      const navigation: unknown = JSON.parse(storedNavigation);
      return Array.isArray(navigation) ? (navigation as T[]) : null;
    } catch {
      return null;
    }
  }

  clear(): void {
    Object.values(WEB_SESSION_KEYS).forEach((key) => sessionStorage.removeItem(key));
    Object.values(LEGACY_WEB_SESSION_KEYS).forEach((key) => sessionStorage.removeItem(key));
  }

  private removeLegacyAuthKeys(): void {
    sessionStorage.removeItem(LEGACY_WEB_SESSION_KEYS.accessToken);
    sessionStorage.removeItem(LEGACY_WEB_SESSION_KEYS.expiresIn);
    sessionStorage.removeItem(LEGACY_WEB_SESSION_KEYS.authType);
  }
}
