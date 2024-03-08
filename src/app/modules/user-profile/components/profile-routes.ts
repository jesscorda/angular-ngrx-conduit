import type { Route } from '@angular/router';
import { ProfileRoutes } from '../constants/profile-routes.enum';

export const PROFILE_ROUTES: Route[] = [
  {
    path: ProfileRoutes.ShowProfileInfo,
    loadComponent: () =>
      import('./user-profile/user-profile.component').then(c => c.UserProfileComponent),
    children: [
      {
        path: ProfileRoutes.EditProfileInfo,
        loadComponent: () =>
          import('./user-profile-edit-modal/user-profile-edit-modal.component').then(
            c => c.UserProfileEditModalComponent,
          ),
      },
    ],
  },
];
