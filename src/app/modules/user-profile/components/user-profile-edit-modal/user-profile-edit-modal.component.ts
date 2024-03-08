import type { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroXMark } from '@ng-icons/heroicons/outline';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import type { AuthState } from '../../../auth/types/auth-state.interface';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../../auth/store/auth.actions';
import { selectIsLoading } from '../../../auth/store/auth.reducer';
import { AsyncPipe, NgIf } from '@angular/common';
import { Subject, combineLatest, takeUntil, tap } from 'rxjs';
import { AvatarComponent } from '../../../../shared/components/avatar/avatar.component';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'app-user-profile-edit-modal',
  standalone: true,
  imports: [NgIconComponent, ReactiveFormsModule, NgIf, AsyncPipe, AvatarComponent],
  templateUrl: './user-profile-edit-modal.component.html',
  providers: [provideIcons({ heroXMark })],
})
export class UserProfileEditModalComponent implements OnInit {
  showModal: boolean = false;

  private _router = inject(Router);

  profileForm = new FormGroup({
    image: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    username: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    bio: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  private readonly _store = inject(Store<{ auth: AuthState }>);

  private readonly _actions$ = inject(Actions);

  private _route = inject(ActivatedRoute);

  destroy$: Subject<boolean> = new Subject<boolean>();

  currentUser$ = this._actions$.pipe(
    ofType(AuthActions.getUserSuccess),
    tap(({ user }) => {
      if (!user) return;
      this.profileForm.patchValue({
        email: user.email,
        username: user.username,
        bio: user.bio ?? '',
        image: user.image ?? '',
      });
    }),
  );

  vm$ = combineLatest({
    isLoading: this._store.select(selectIsLoading),
    user: this.currentUser$,
  });

  closeDialogAfterSave$ = this._actions$
    .pipe(
      ofType(AuthActions.updateUserSuccess),
      tap(() => this.closeDialog()),
      takeUntil(this.destroy$),
    )
    .subscribe();

  ngOnInit(): void {
    const username = this._route.snapshot.paramMap.get('username');
    if (username) {
      this.showModal = true;
    }
    this._store.dispatch(AuthActions.getUser());
  }

  saveProfileChanges(): void {
    const payload = this.profileForm.getRawValue();
    this._store.dispatch(AuthActions.updateUser({ user: payload }));
  }

  closeDialog(): void {
    this._router.navigate(['../'], { relativeTo: this._route });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
