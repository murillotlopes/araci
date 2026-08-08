import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { APP_ENVIRONMENT } from '../../config/app-environment.token';
import { ApiError, getApiErrorTitle } from '../api-error';
import { isUrlWithinBase } from '../api-url.token';

export const apiErrorInterceptor: HttpInterceptorFn = (request, next) => {
  const apiBaseUrl = inject(APP_ENVIRONMENT).apiBaseUrl;
  const toastr = inject(ToastrService);

  if (!isUrlWithinBase(request.url, apiBaseUrl)) return next(request);

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      const response = isApiError(error.error) ? error.error : null;
      const statusCode = response?.statusCode ?? error.status;
      const message = response?.message ?? error.message ?? 'Não foi possível concluir a solicitação.';
      const title = getApiErrorTitle(statusCode);

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
