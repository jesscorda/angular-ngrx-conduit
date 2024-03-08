import { createFeature, createReducer, on } from '@ngrx/store';
import type { AuthState } from '../types/auth-state.interface';
import { AuthActions } from './auth.actions';

export const initialAuthState: AuthState = {
  currentUser: null,
  errors: null,
  isLoading: false,
};

export const authFeatureName = 'auth';

export const authFeaure = createFeature({
  name: authFeatureName,
  reducer: createReducer(
    initialAuthState,
    on(AuthActions.login, state => ({ ...state, isLoading: true })),
    on(AuthActions.loginSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      currentUser: action.user,
    })),
    on(AuthActions.loginFailure, (state, action) => ({
      ...state,
      isLoading: false,
      errors: action,
    })),
    on(AuthActions.registerUser, state => ({ ...state, isLoading: true })),
    on(AuthActions.registerUserSuccess, (state, action) => ({
      ...state,
      currentUser: action.user,
      isLoading: false,
    })),
    on(AuthActions.registerUserFailure, (state, action) => ({
      ...state,
      errors: action,
      isLoading: false,
    })),
    on(AuthActions.getUser, state => ({ ...state, isLoading: true })),
    on(AuthActions.getUserSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      currentUser: action.user,
    })),
    on(AuthActions.getUserFailure, (state, action) => ({
      ...state,
      isLoading: false,
      errors: action.errors,
    })),
    on(AuthActions.updateUser, state => ({ ...state, isLoading: true })),
    on(AuthActions.updateUserSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      currentUser: action.user,
    })),
    on(AuthActions.updateUserFailure, (state, action) => ({
      ...state,
      isLoading: false,
      errors: action.errors,
    })),
    on(AuthActions.logout, (state) => ({
      ...state,
      currentUser: null,
    })),
  ),
});

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectAuthState,
  selectCurrentUser,
  selectErrors,
  selectIsLoading,
} = authFeaure;
