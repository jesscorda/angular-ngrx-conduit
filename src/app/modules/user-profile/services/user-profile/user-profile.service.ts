import { Injectable, inject } from '@angular/core';
import { ApiService } from '../../../../shared/services/api/api.service';
import { ProfileApiUrls } from '../../constants/profile-api-urls.enum';
import type { UserProfile } from '../../../../shared/types/user-profile.interface';
import type { Username } from '../../../../shared/types/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private _apiService = inject(ApiService);

  getUserProfile(username: Username) {
    return this._apiService.get<{ profile: UserProfile }>(
      ProfileApiUrls.GetUserProfile.replace(':username', username),
    );
  }
}
