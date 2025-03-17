import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { appRoutes } from './app.routes';
import Material from '@primeng/themes/material';
import { definePreset } from '@primeng/themes';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

/**
 * Factoría para cargar archivos JSON de traducción.
 * @param http - Cliente HTTP inyectado
 * @returns Instancia de TranslateHttpLoader
 */
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
// 🔥 Definir correctamente el tema de PrimeNG
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
        provideHttpClient(), // ✅ Asegurar que HttpClient esté disponible
        provideRouter(
            appRoutes,
            withInMemoryScrolling({
                anchorScrolling: 'enabled',
                scrollPositionRestoration: 'enabled'
            }),
            withEnabledBlockingInitialNavigation()
        ),
        provideAnimationsAsync(),
        providePrimeNG({
            ripple: true,
            inputStyle: 'outlined',
            translation: {
                accept: 'Aceptar',
                reject: 'Rechazar'
            },
            zIndex: {
                modal: 50,
                overlay: 50,
                menu: 50,
                tooltip: 50
            },
            theme: { preset: MyPreset, options: { darkModeSelector: '.app-dark' } }
        }),
        ...(TranslateModule.forRoot({
            defaultLanguage: 'en',
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient] // ✅ Usa `HttpClient` en lugar de `provideHttpClient`
            }
        }).providers ?? [])
    ]
};
