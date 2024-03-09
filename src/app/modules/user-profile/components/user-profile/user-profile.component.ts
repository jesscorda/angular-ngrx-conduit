import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectProfile } from '../../store/profile.reducer';
import type { ProfileState } from '../../types/profile-state.interface';
import { AsyncPipe, NgIf } from '@angular/common';
import { AvatarComponent } from '../../../../shared/components/avatar/avatar.component';
import { profileActions } from '../../store/profile.actions';
import type { AuthState } from '../../../auth/types/auth-state.interface';
import { selectCurrentUser } from '../../../auth/store/auth.reducer';
import { Subject, combineLatest, takeUntil, tap } from 'rxjs';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { AuthActions } from '../../../auth/store/auth.actions';
import type { Username } from '../../../../shared/types/user.interface';
import { Actions, ofType } from '@ngrx/effects';
import { HorizontalDividerComponent } from '../../../../shared/components/horizontal-divider/horizontal-divider.component';
import type { ArticleState } from '../../../articles/types/article-state.interface';
import { articlePageActions } from '../../../articles/store/articles.actions';
import { selectArticles } from '../../../articles/store/articles.reducer';
import { ArticleCardListComponent } from '../../../articles/components/article-card-list/article-card-list.component';
import { AppRoutes } from '../../../../shared/constants/app-route-names.enum';
import { ProfileRoutes } from '../../constants/profile-routes.enum';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    AvatarComponent,
    RouterLink,
    RouterOutlet,
    HorizontalDividerComponent,
    ArticleCardListComponent,
  ],
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent {
  private readonly _profileStore = inject(Store<{ profile: ProfileState }>);

  private readonly _authStore = inject(Store<{ auth: AuthState }>);

  private readonly _articleStore = inject(Store<{ articles: ArticleState }>);

  private readonly _actions$ = inject(Actions);

  private _route = inject(ActivatedRoute);

  profileEditRoute = `/${AppRoutes.Profile}/:username/${ProfileRoutes.EditProfileInfo}`;

  destroy$: Subject<boolean> = new Subject<boolean>();

  userUpdateSuccess$ = this._actions$
    .pipe(
      ofType(AuthActions.updateUserSuccess),
      tap(action => {
        this.getInitialData(action.user.username);
      }),
      takeUntil(this.destroy$),
    )
    .subscribe();

  routeParamMatched$ = this._route.paramMap
    .pipe(
      tap(params => {
        const username = params.get('username');
        if (!username) return;
        this.getInitialData(username);
      }),
      takeUntil(this.destroy$),
    )
    .subscribe();

  vm$ = combineLatest({
    profile: this._profileStore.select(selectProfile).pipe(
      tap(userprofile => {
        if (!userprofile) return;
        this.profileEditRoute = this.profileEditRoute.replace(
          ProfileRoutes.ShowProfileInfo,
          userprofile.username,
        );
      }),
    ),
    articles: this._articleStore.select(selectArticles),
    currentUser: this._authStore.select(selectCurrentUser),
  });

  getInitialData(username: Username): void {
    this._profileStore.dispatch(profileActions.getProfile({ username }));
    this._articleStore.dispatch(
      articlePageActions.getAllArticles({ queryParams: { favorited: username } }),
    );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
