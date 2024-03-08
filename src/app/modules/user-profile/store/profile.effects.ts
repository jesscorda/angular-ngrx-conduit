import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserProfileService } from '../services/user-profile/user-profile.service';
import { profileActions } from './profile.actions';
import { catchError, map, of, switchMap } from 'rxjs';

export const getUserProfile = createEffect(
  (actions$ = inject(Actions), userProfileService = inject(UserProfileService)) => {
    return actions$.pipe(
      ofType(profileActions.getProfile),
      switchMap(action =>
        userProfileService.getUserProfile(action.username).pipe(
          map(profile => profileActions.getProfileSuccess(profile)),
          catchError(error => of(profileActions.getProfileFailure(error))),
        ),
      ),
    );
  },
  { functional: true },
);
