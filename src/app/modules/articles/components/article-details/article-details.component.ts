import type { OnInit } from '@angular/core';
import { Component, Input, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import type { ArticleState } from '../../types/article-state.interface';
import { articlePageActions } from '../../store/articles.actions';
import { combineLatest } from 'rxjs';
import { selectArticle, selectIsLoading } from '../../store/articles.reducer';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { AvatarComponent } from '../../../../shared/components/avatar/avatar.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroHeartSolid } from '@ng-icons/heroicons/solid';
import { heroArrowLeft } from '@ng-icons/heroicons/outline';
import { TagComponent } from '../../../../shared/components/tag/tag.component';
import { ArticleActionsComponent } from '../article-actions/article-actions.component';
import { ArticleAuthorComponent } from '../article-author/article-author.component';
import type { Article } from '../../types/article.interface';
import type { UserProfile } from '../../../../shared/types/user-profile.interface';
import { RouterLink } from '@angular/router';
import { ActionButtonComponent } from '../../../../shared/components/action-button/action-button.component';
import { AppRoutes } from '../../../../shared/constants/app-route-names.enum';

@Component({
  selector: 'app-article-details',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    AvatarComponent,
    DatePipe,
    NgIconComponent,
    TagComponent,
    ArticleActionsComponent,
    ArticleAuthorComponent,
    ActionButtonComponent,
    RouterLink,
  ],
  templateUrl: './article-details.component.html',
  providers: [provideIcons({ heroHeartSolid, heroArrowLeft })],
})
export class ArticleDetailsComponent implements OnInit {
  @Input() slug!: string;

  private readonly _store = inject(Store<{ articleState: ArticleState }>);

  readonly articlesRoute = `/${AppRoutes.Articles}/all`;

  readonly profileRoute = `/${AppRoutes.Profile}`;

  vm$ = combineLatest({
    isLoading: this._store.select(selectIsLoading),
    article: this._store.select(selectArticle),
  });

  ngOnInit(): void {
    if (this.slug) {
      this._store.dispatch(articlePageActions.getArticle({ slug: this.slug }));
    }
  }

  onToggleFavoriteArticle(article: Article | null): void {
    if (!article) return;
    const isFavorite = !article.favorited;
    if (isFavorite) this._store.dispatch(articlePageActions.favoriteArticle({ slug: this.slug }));
    else this._store.dispatch(articlePageActions.unfavoriteArticle({ slug: this.slug }));
  }

  onToggleFollowUser(author: UserProfile | undefined): void {
    if (!author) return;
    const isFollowing = !author.following;
    if (isFollowing)
      this._store.dispatch(articlePageActions.followProfile({ username: author.username }));
    else this._store.dispatch(articlePageActions.unfollowProfile({ username: author.username }));
  }
}
