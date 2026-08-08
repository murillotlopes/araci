import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AdminSessionService } from '../../auth/session/admin-session.service';
import { WebSessionService } from '../../auth/session/web-session.service';
import { ADMIN_API_URL, isUrlWithinBase, WEB_API_URL } from '../api-url.token';

export const apiAuthInterceptor: HttpInterceptorFn = (request, next) => {
  const webApiUrl = inject(WEB_API_URL);
  const adminApiUrl = inject(ADMIN_API_URL);
  const webSession = inject(WebSessionService);
  const adminSession = inject(AdminSessionService);

  if (isUrlWithinBase(request.url, webApiUrl)) {
    const token = webSession.accessToken;
    const authenticatedRequest = request.clone({
      withCredentials: true,
      setHeaders: token ? { Authorization: `Bearer ${token}` } : {},
    });

    return next(authenticatedRequest);
  }

  if (isUrlWithinBase(request.url, adminApiUrl)) {
    const token = adminSession.accessToken;
    const authenticatedRequest = token
      ? request.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : request;

    return next(authenticatedRequest);
  }

  return next(request);
};
