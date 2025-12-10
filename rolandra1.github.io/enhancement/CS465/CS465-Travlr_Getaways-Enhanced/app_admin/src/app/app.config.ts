import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { jwtInterceptorProvider } from './utils/jwt.interceptor';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    jwtInterceptorProvider,
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection()
  ]
};
