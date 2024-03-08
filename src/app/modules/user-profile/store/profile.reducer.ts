import { createFeature, createReducer, on } from '@ngrx/store';
import type { ProfileState } from '../types/profile-state.interface';
import { profileActions } from './profile.actions';

export const initialProfileState: ProfileState = {
  isLoading: false,
  profile: null,
  errors: null,
};

export const profileFeature = createFeature({
  name: 'profile',
  reducer: createReducer(
    initialProfileState,
    on(profileActions.getProfile, state => ({ ...state, isLoading: true })),
    on(profileActions.getProfileSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      profile: action.profile,
    })),
    on(profileActions.getProfileFailure, (state, action) => ({
      ...state,
      isLoading: false,
      errors: action.errors,
    })),
  ),
});

export const {
  name,
  reducer: profileReducer,
  selectErrors,
  selectIsLoading,
  selectProfile,
  selectProfileState,
} = profileFeature;
