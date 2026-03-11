import { ApplicationConfig, PLATFORM_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './authentication/services/interceptors/auth-interceptor';
import { provideNativeDateAdapter } from '@angular/material/core';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // Provide HttpClient and ensure interceptors registered via DI are applied
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    provideHttpClient(
      withInterceptors([authInterceptor]) // 🔑 Automated security active!
    ),
    provideNativeDateAdapter(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
  ]
};
