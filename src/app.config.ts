import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, InjectionToken } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { appRoutes } from './app.routes';
import Material from '@primeng/themes/material';
import { definePreset } from '@primeng/themes';
import { provideNgxMask } from 'ngx-mask';
import {
    provideTanStackQuery,
    QueryClient,
    withDevtools,
  } from '@tanstack/angular-query-experimental'
import { Environment } from '@/shared/types/environment';
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
        provideRouter(
            appRoutes,
            withInMemoryScrolling({
                anchorScrolling: 'enabled',
                scrollPositionRestoration: 'enabled'
            }),
            withEnabledBlockingInitialNavigation()
        ),
        provideHttpClient(withFetch()),
        provideAnimationsAsync(),
        providePrimeNG({
            ripple: true,
            inputStyle: 'filled',
            theme: { preset: MyPreset, options: { darkModeSelector: '.app-dark' } }
        }),
        provideTanStackQuery(new QueryClient(), withDevtools(() => ({ loadDevtools: 'auto' }))),
        provideNgxMask()
    ]
};
