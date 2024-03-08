import { Injectable, inject } from '@angular/core';
import type { LoginUserPayload } from '../types/login.interface';
import type { User, UserRequestPayload } from '../../../shared/types/user.interface';
import { AuthApiUrls } from '../constants/auth-api-urls.enum';
import type { RegisterUserPayload } from '../types/register-user.interface';
import { ApiService } from '../../../shared/services/api/api.service';
import { LocalStorageService } from '../../../shared/services/local-storage/local-storage.service';
import type { AuthState } from '../types/auth-state.interface';
import { Store } from '@ngrx/store';
import { AuthActions } from '../store/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _apiService = inject(ApiService);

  private _localStorageService = inject(LocalStorageService);

  store = inject(Store<{ auth: AuthState }>);

  constructor() {}

  login(payload: LoginUserPayload) {
    return this._apiService.post<{ user: User }, LoginUserPayload>(AuthApiUrls.login, payload);
  }

  registerUser(payload: RegisterUserPayload) {
    return this._apiService.post<{ user: User }, RegisterUserPayload>(
      AuthApiUrls.register,
      payload,
    );
  }

  getUser() {
    return this._apiService.get<{ user: User }>(AuthApiUrls.getUser);
  }

  updateUser(payload: { user: UserRequestPayload }) {
    return this._apiService.put<{ user: User }, { user: UserRequestPayload }>(
      AuthApiUrls.updateUser,
      payload,
    );
  }

  logoutUser(): void {
    this._localStorageService.removeToken();
  }

  getCurrentUserDetailsOnInit(): void {
    if (this._localStorageService.getToken()) {
      this.store.dispatch(AuthActions.getUser());
    }
  }
}
