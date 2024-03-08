import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AvatarComponent } from '../../../../shared/components/avatar/avatar.component';
import type { UserProfile } from '../../../../shared/types/user-profile.interface';
import { ActionButtonComponent } from '../../../../shared/components/action-button/action-button.component';
import { RouterLink } from '@angular/router';
import { AppRoutes } from '../../../../shared/constants/app-route-names.enum';

@Component({
  selector: 'app-article-author',
  standalone: true,
  imports: [AvatarComponent, ActionButtonComponent, RouterLink],
  templateUrl: './article-author.component.html',
})
export class ArticleAuthorComponent {
  @Input({ required: true }) author: UserProfile | undefined;

  @Output() toggleFollowUser = new EventEmitter<UserProfile>();

  readonly profileRoute = `/${AppRoutes.Profile}`;

  onToggleFollowUser(author: UserProfile | undefined): void {
    if (!author) return;
    this.toggleFollowUser.emit(author);
  }
}
