import { Routes } from '@angular/router';

export default [
    {
        path: '',
        children: [
            {
                path: 'login',
                loadComponent: () => import('@pages/auth/home-login/home-login.component').then(m => m.HomeLoginComponent)
            }
        ]
    }

] as Routes;
