import { Routes } from '@angular/router';
import { AppLayout } from '@/layout/components/app.layout';

export const appRoutes: Routes = [
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' },

    {
        path: 'auth',
        children: [
            {
                path: 'login',
                loadComponent: () => import('./app/apps/auth/login/login.component').then((c) => c.LoginComponent)
            }
        ]
    }
];
