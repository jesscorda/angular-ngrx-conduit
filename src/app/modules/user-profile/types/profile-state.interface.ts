import type { BackendErrors } from '../../../shared/types/backend-errors.interface';
import type { UserProfile } from '../../../shared/types/user-profile.interface';

export interface ProfileState {
  profile: UserProfile | null;
  isLoading: boolean;
  errors: BackendErrors | null;
}
