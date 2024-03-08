import { Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { NgIconComponent } from '@ng-icons/core';
import { Store } from '@ngrx/store';
import { AvatarComponent } from '../../shared/components/avatar/avatar.component';
import { Router, RouterLink } from '@angular/router';
import { AppRoutes } from '../../shared/constants/app-route-names.enum';
import { AuthRoutes } from '../../modules/auth/constants/auth-routes.enum';
import type { AuthState } from '../../modules/auth/types/auth-state.interface';
import { selectCurrentUser } from '../../modules/auth/store/auth.reducer';
import { AuthActions } from '../../modules/auth/store/auth.actions';
import { AuthService } from '../../modules/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, NgIconComponent, AvatarComponent, AsyncPipe, RouterLink],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  private readonly _store = inject(Store<{ auth: AuthState }>);

  private _authService = inject(AuthService);

  private _router = inject(Router);

  user$ = this._store.select(selectCurrentUser);

  readonly loginRoute = `/${AppRoutes.Auth}/${AuthRoutes.Login}`;

  readonly homeRoute = `/${AppRoutes.Home}`;

  readonly profileRoute = `/${AppRoutes.Profile}`;

  onLogoutUser(): void {
    this._store.dispatch(AuthActions.logout());
    this._authService.logoutUser();
    this._router.navigate([this.loginRoute]);
  }
}
