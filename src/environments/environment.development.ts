import { AppEnvironment } from '../app/core/config/app-environment';

export const environment = {
  name: 'development',
  production: false,
  apiBaseUrl: 'http://localhost:4000',
} satisfies AppEnvironment;
