import { InjectionToken } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AppEnvironment } from './app-environment';

export const APP_ENVIRONMENT = new InjectionToken<AppEnvironment>('APP_ENVIRONMENT', {
  providedIn: 'root',
  factory: () => environment,
});
