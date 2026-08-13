export type EnvironmentName = 'development' | 'sandbox' | 'homologation' | 'production';

export interface AppEnvironment {
  name: EnvironmentName;
  production: boolean;
  apiBaseUrl: string;
}
