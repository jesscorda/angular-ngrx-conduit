import { createActionGroup, props } from '@ngrx/store';
import { ProfileActionNames } from '../constants/profile-action-names.enum';
import type { Username } from '../../../shared/types/user.interface';
import type { UserProfile } from '../../../shared/types/user-profile.interface';
import type { BackendErrors } from '../../../shared/types/backend-errors.interface';

export const profileActions = createActionGroup({
  source: 'profile',
  events: {
    [ProfileActionNames.GetProfile]: props<{ username: Username }>(),
    [ProfileActionNames.GetProfileSuccess]: props<{ profile: UserProfile }>(),
    [ProfileActionNames.GetProfileFailure]: props<{ errors: BackendErrors }>(),
  },
});
