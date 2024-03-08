import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import {
  provideRouter,
  withComponentInputBinding,
  withEnabledBlockingInitialNavigation,
  withRouterConfig,
} from '@angular/router';
import { APP_ROUTES } from './app/app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { isDevMode } from '@angular/core';
import { authFeaure } from './app/modules/auth/store/auth.reducer';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import * as authEffects from './app/modules/auth/store/auth.effects';
import * as articlesEffects from './app/modules/articles/store/articles.effects';
import * as profileEffects from './app/modules/user-profile/store/profile.effects';
import { authInterceptor } from './app/shared/interceptors/auth/auth.interceptor';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { articleFeature } from './app/modules/articles/store/articles.reducer';
import { backendErrorInterceptor } from './app/shared/interceptors/backend-error/beckend-error.interceptor';
import { profileFeature } from './app/modules/user-profile/store/profile.reducer';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor, backendErrorInterceptor])),
    provideRouter(
      APP_ROUTES,
      withEnabledBlockingInitialNavigation(),
      withComponentInputBinding(),
      withRouterConfig({ paramsInheritanceStrategy: 'always' }),
    ),
    provideStore(),
    provideState(authFeaure),
    provideEffects(authEffects),
    provideEffects(articlesEffects),
    provideState(articleFeature),
    provideEffects(profileEffects),
    provideState(profileFeature),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects(),
    provideAnimations(),
    provideToastr(),
  ],
});
