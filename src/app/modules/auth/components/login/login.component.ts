import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import type { LoginForm } from '../../types/login.interface';
import { AuthRoutes } from '../../constants/auth-routes.enum';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../store/auth.actions';
import type { AuthState } from '../../types/auth-state.interface';
import { selectIsLoading } from '../../store/auth.reducer';
import { combineLatest } from 'rxjs';
import { AppRoutes } from '../../../../shared/constants/app-route-names.enum';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private readonly _store = inject(Store<{ auth: AuthState }>);

  readonly registerUserRoute = `/${AppRoutes.Auth}/${AuthRoutes.RegisterUser}`;

  loginForm = new FormGroup<LoginForm>({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  vm$ = combineLatest({
    isLoading: this._store.select(selectIsLoading),
  });

  onLoginUser(): void {
    const loginUserPayload = { user: this.loginForm.getRawValue() };
    this._store.dispatch(AuthActions.login(loginUserPayload));
  }
}
