import { inject, InjectionToken } from '@angular/core';
import { APP_ENVIRONMENT } from '../config/app-environment.token';

function getApiAreaUrl(area: 'web' | 'admin'): string {
  const baseUrl = inject(APP_ENVIRONMENT).apiBaseUrl.replace(/\/$/, '');
  return `${baseUrl}/${area}`;
}

export const WEB_API_URL = new InjectionToken<string>('WEB_API_URL', {
  providedIn: 'root',
  factory: () => getApiAreaUrl('web'),
});

export const ADMIN_API_URL = new InjectionToken<string>('ADMIN_API_URL', {
  providedIn: 'root',
  factory: () => getApiAreaUrl('admin'),
});

export function isUrlWithinBase(url: string, baseUrl: string): boolean {
  return url === baseUrl || url.startsWith(`${baseUrl}/`) || url.startsWith(`${baseUrl}?`);
}
