import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { APP_ENVIRONMENT } from '../../config/app-environment.token';
import { AdminSessionService } from '../../auth/session/admin-session.service';
import { WebSessionService } from '../../auth/session/web-session.service';
import { ApiError, getApiErrorTitle } from '../api-error';
import { ADMIN_API_URL, isUrlWithinBase, WEB_API_URL } from '../api-url.token';

export const apiErrorInterceptor: HttpInterceptorFn = (request, next) => {
  const apiBaseUrl = inject(APP_ENVIRONMENT).apiBaseUrl;
  const webApiUrl = inject(WEB_API_URL);
  const adminApiUrl = inject(ADMIN_API_URL);
  const webSession = inject(WebSessionService);
  const adminSession = inject(AdminSessionService);
  const router = inject(Router);
  const toastr = inject(ToastrService);

  if (!isUrlWithinBase(request.url, apiBaseUrl)) return next(request);

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      const response = isApiError(error.error) ? error.error : null;
      const statusCode = response?.statusCode ?? error.status;
      const message = response?.message ?? error.message ?? 'Não foi possível concluir a solicitação.';
      const title = getApiErrorTitle(statusCode);
      const isWebRefresh = isUrlWithinBase(request.url, `${webApiUrl}/auth/refresh`);

      if (statusCode === 401) {
        if (isUrlWithinBase(request.url, webApiUrl)) webSession.clear();
        if (isUrlWithinBase(request.url, adminApiUrl)) adminSession.clear();
        void router.navigate(['/login']);
      }

      if (statusCode === 401 && isWebRefresh) return throwError(() => error);

      if (statusCode >= 500) toastr.error(message, title);
      else toastr.warning(message, title);

      return throwError(() => error);
    }),
  );
};

function isApiError(value: unknown): value is ApiError {
  if (typeof value !== 'object' || value === null) return false;

  const candidate = value as Partial<ApiError>;
  return typeof candidate.statusCode === 'number' && typeof candidate.message === 'string';
}
