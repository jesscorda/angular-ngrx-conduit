import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import { AuthActions } from './auth.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { LocalStorageService } from '../../../shared/services/local-storage/local-storage.service';
import { Router } from '@angular/router';
import type { BackendErrors } from '../../../shared/types/backend-errors.interface';
import { AppRoutes } from '../../../shared/constants/app-route-names.enum';
import { Store } from '@ngrx/store';
import type { AuthState } from '../types/auth-state.interface';

export const login = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(AuthActions.login),
      switchMap((action: ReturnType<typeof AuthActions.login>) =>
        authService.login(action).pipe(
          map(user => AuthActions.loginSuccess(user)),
          catchError((errors: BackendErrors) => {
            return of(AuthActions.loginFailure(errors));
          }),
        ),
      ),
    );
  },
  { functional: true },
);

export const registerUser = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(AuthActions.registerUser),
      switchMap((action: ReturnType<typeof AuthActions.registerUser>) =>
        authService.registerUser(action).pipe(
          map(user => AuthActions.registerUserSuccess(user)),
          catchError((errors: BackendErrors) => of(AuthActions.registerUserFailure(errors))),
        ),
      ),
    );
  },
  { functional: true },
);

export const storeJwtToken = createEffect(
  (actions$ = inject(Actions), localStorageService = inject(LocalStorageService)) => {
    return actions$.pipe(
      ofType(AuthActions.registerUserSuccess, AuthActions.loginSuccess),
      tap(action => localStorageService.setToken(action.user.token)),
    );
  },
  { functional: true, dispatch: false },
);

export const redirectToHome = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(AuthActions.registerUserSuccess, AuthActions.loginSuccess),
      tap(_ => router.navigate([AppRoutes.Home])),
    );
  },
  { functional: true, dispatch: false },
);

export const fetchCurrentUserDetails = createEffect(
  (actions$ = inject(Actions), store = inject(Store<{ auth: AuthState }>)) => {
    return actions$.pipe(
      ofType(AuthActions.registerUserSuccess, AuthActions.loginSuccess),
      tap(_ => store.dispatch(AuthActions.getUser())),
    );
  },
  { functional: true, dispatch: false },
);

export const getUser = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(AuthActions.getUser),
      switchMap(() =>
        authService.getUser().pipe(
          map(user => AuthActions.getUserSuccess(user)),
          catchError((errors: BackendErrors) => of(AuthActions.getUserFailure({ errors }))),
        ),
      ),
    );
  },
  { functional: true },
);

export const updateUser = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(AuthActions.updateUser),
      switchMap((action: ReturnType<typeof AuthActions.updateUser>) =>
        authService.updateUser(action).pipe(
          map(user => AuthActions.updateUserSuccess(user)),
          catchError((errors: BackendErrors) => of(AuthActions.updateUserFailure({ errors }))),
        ),
      ),
    );
  },
  { functional: true },
);
