import { Route } from '@angular/router';
import { AppComponent } from './app.component';

export const APP_ROUTES: Route[] = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/components/auth.routes').then(r => r.AUTH_ROUTES),
  },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
];
