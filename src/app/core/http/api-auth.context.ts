import { HttpContext, HttpContextToken } from '@angular/common/http';

export type ApiAccessArea = 'web' | 'admin' | null;

export const API_ACCESS_AREA = new HttpContextToken<ApiAccessArea>(() => null);

export function withWebAccessToken(context = new HttpContext()): HttpContext {
  return context.set(API_ACCESS_AREA, 'web');
}

export function withAdminAccessToken(context = new HttpContext()): HttpContext {
  return context.set(API_ACCESS_AREA, 'admin');
}
