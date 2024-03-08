import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { UserProfileEditModalComponent } from './user-profile-edit-modal.component';

describe('UserProfileEditModalComponent', () => {
  let component: UserProfileEditModalComponent;
  let fixture: ComponentFixture<UserProfileEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfileEditModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserProfileEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
