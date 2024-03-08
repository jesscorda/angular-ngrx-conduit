import type { BackendErrors } from '../../../shared/types/backend-errors.interface';
import type { User } from '../../../shared/types/user.interface';

export interface AuthState {
  isLoading: boolean;
  currentUser: User | null;
  errors: BackendErrors | null;
}
