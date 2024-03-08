import type { Route } from '@angular/router';
import { AppRoutes } from './shared/constants/app-route-names.enum';

export const APP_ROUTES: Route[] = [
  {
    path: AppRoutes.Auth,
    loadChildren: () => import('./modules/auth/components/auth.routes').then(r => r.AUTH_ROUTES),
  },
  {
    path: AppRoutes.Home,
    loadChildren: () => import('./modules/home/components/home.routes').then(r => r.HOME_ROUTES),
  },
  {
    path: AppRoutes.Articles,
    loadChildren: () =>
      import('./modules/articles/components/articles.routes').then(r => r.ARTICLE_ROUTES),
  },
  {
    path: AppRoutes.Profile,
    loadChildren: () =>
      import('./modules/user-profile/components/profile-routes').then(r => r.PROFILE_ROUTES),
  },
  { path: '', redirectTo: AppRoutes.Auth, pathMatch: 'full' },
];
