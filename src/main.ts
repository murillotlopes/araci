import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/core/bootstrap/app.component';
import { appConfig } from './app/core/bootstrap/app.config';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
