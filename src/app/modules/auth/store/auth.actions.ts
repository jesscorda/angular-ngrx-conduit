import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AuthActionNames } from '../constants/auth-actions.enum';
import type { LoginUserPayload } from '../types/login.interface';
import type { User, UserRequestPayload } from '../../../shared/types/user.interface';
import type { RegisterUserPayload } from '../types/register-user.interface';
import type { BackendErrors } from '../../../shared/types/backend-errors.interface';

export const AuthActions = createActionGroup({
  source: 'auth',
  events: {
    [AuthActionNames.Login]: props<LoginUserPayload>(),
    [AuthActionNames.LoginSuccess]: props<{ user: User }>(),
    [AuthActionNames.loginFailure]: props<BackendErrors>(),
    [AuthActionNames.RegisterUser]: props<RegisterUserPayload>(),
    [AuthActionNames.RegisterUserSuccess]: props<{ user: User }>(),
    [AuthActionNames.RegisterUserFailure]: props<BackendErrors>(),
    [AuthActionNames.GetUser]: emptyProps(),
    [AuthActionNames.GetUserSuccess]: props<{ user: User }>(),
    [AuthActionNames.GetUserFailure]: props<{ errors: BackendErrors }>(),
    [AuthActionNames.UpdateUser]: props<{ user: UserRequestPayload }>(),
    [AuthActionNames.UpdateUserSuccess]: props<{ user: User }>(),
    [AuthActionNames.UpdateUserFailure]: props<{ errors: BackendErrors }>(),
    [AuthActionNames.Logout]: emptyProps(),
  },
});
