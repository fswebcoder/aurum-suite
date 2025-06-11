import { AppLayout } from '@/presentation/modules/layout/components/app.layout';
import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },

  {
    path: 'auth',
    loadChildren: () => import('@pages/pages.routes')
  },
  {
    path: '',
    component: AppLayout,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },

      {
        path: 'home',
        data: { breadcrumb: 'Inicio' },
        loadComponent: () =>
          import('@/shared/components/default-page/default-page.component').then(c => c.DefaultPageComponent)
      },
      {
        path: 'lims',
        data: { breadcrumb: 'Lims' },

        loadChildren: () => import('@lims/lims.routes')
      }
    ]
  },

  // { path: 'auth', loadChildren: () => import('@/pages/auth/auth.routes') },
  // {
  //     path: 'landing',
  //     loadComponent: () => import('@/pages/landing/landing').then((c) => c.Landing)
  // },
  // {
  //     path: 'notfound',
  //     loadComponent: () => import('@/pages/notfound/notfound').then((c) => c.Notfound)
  // },
  // { path: '**', redirectTo: '/notfound' }
];
