import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, InjectionToken, isDevMode } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { appRoutes } from './app.routes';
import Material from '@primeng/themes/material';
import { definePreset } from '@primeng/themes';
import { provideNgxMask } from 'ngx-mask';
import { provideTanStackQuery, QueryClient, withDevtools } from '@tanstack/angular-query-experimental';
import { Environment } from '@/shared/types/environment';
import { provideCore } from '@/core/providers/store/provide.core';
import { authProvider } from '@/core/providers/auth/auth.provider';
import { ALL_REPOSITORIES } from '@/core/providers/repositories.provide';
import { environment } from './enviromments/environment';
import { MessageService } from 'primeng/api';
import { authInterceptor } from '@/core/interceptors/auth.interceptor';

export const ENVIRONMENT = new InjectionToken<Environment>('environment');

const MyPreset = definePreset(Material, {
  semantic: {
    primary: {
      50: '{indigo.50}',
      100: '{indigo.100}',
      200: '{indigo.200}',
      300: '{indigo.300}',
      400: '{indigo.400}',
      500: '{indigo.500}',
      600: '{indigo.600}',
      700: '{indigo.700}',
      800: '{indigo.800}',
      900: '{indigo.900}',
      950: '{indigo.950}'
    }
  }
});

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: ENVIRONMENT, useValue: environment },
    MessageService,
    provideCore(),
    provideRouter(
      appRoutes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled'
      }),
      withEnabledBlockingInitialNavigation()
    ),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    provideAnimationsAsync(),
    ...ALL_REPOSITORIES,
    providePrimeNG({
      ripple: true,
      inputStyle: 'filled',
      theme: { preset: MyPreset, options: { darkModeSelector: '.app-dark' } }
    }),
    provideTanStackQuery(
        new QueryClient({
          defaultOptions: {
            queries: {
              staleTime: 5 * 60 * 1000, // 5 minutos
              gcTime: 5 * 60 * 1000, // 5 minutos
              retry: 0,
              refetchOnWindowFocus: false
            }
          }
        })
      ),
    provideNgxMask()
  ]
};
