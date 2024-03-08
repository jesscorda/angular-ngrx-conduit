import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { RegisterForm } from '../../types/register-user.interface';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import type { AuthState } from '../../types/auth-state.interface';
import { AuthActions } from '../../store/auth.actions';
import { selectIsLoading } from '../../store/auth.reducer';
import { combineLatest } from 'rxjs';
import { AppRoutes } from '../../../../shared/constants/app-route-names.enum';
import { AuthRoutes } from '../../constants/auth-routes.enum';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register-user.component.html',
})
export class RegisterUserComponent {
  private readonly _store = inject(Store<{ auth: AuthState }>);

  readonly loginRoute = `/${AppRoutes.Auth}/${AuthRoutes.Login}`;

  vm$ = combineLatest({
    isLoading: this._store.select(selectIsLoading),
  });

  registerUserForm = new FormGroup<RegisterForm>({
    username: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  onRegisterUser(): void {
    const payload = { user: this.registerUserForm.getRawValue() };
    this._store.dispatch(AuthActions.registerUser(payload));
  }
}
