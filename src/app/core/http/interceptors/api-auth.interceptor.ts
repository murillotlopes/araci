import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { switchMap } from 'rxjs';
import { AdminSessionService } from '../../auth/session/admin-session.service';
import { WebSessionService } from '../../auth/session/web-session.service';
import { API_ACCESS_AREA } from '../api-auth.context';
import { ADMIN_API_URL, isUrlWithinBase, WEB_API_URL } from '../api-url.token';

export const apiAuthInterceptor: HttpInterceptorFn = (request, next) => {
  const webApiUrl = inject(WEB_API_URL);
  const adminApiUrl = inject(ADMIN_API_URL);
  const webSession = inject(WebSessionService);
  const adminSession = inject(AdminSessionService);
  const accessArea = request.context.get(API_ACCESS_AREA);

  if (isUrlWithinBase(request.url, webApiUrl)) {
    if (isUrlWithinBase(request.url, `${webApiUrl}/auth/refresh`)) {
      return next(request.clone({
        withCredentials: true,
        headers: request.headers.delete('Authorization'),
      }));
    }

    if (accessArea !== 'web') return next(request);

    return webSession.getValidAccessToken().pipe(
      switchMap((token) => next(request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      }))),
    );
  }

  if (isUrlWithinBase(request.url, adminApiUrl)) {
    if (accessArea !== 'admin') return next(request);

    const token = adminSession.accessToken;
    const authenticatedRequest = token
      ? request.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : request;

    return next(authenticatedRequest);
  }

  return next(request);
};
