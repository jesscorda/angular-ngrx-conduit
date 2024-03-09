import { Injectable, inject } from '@angular/core';
import { ApiService } from '../../../../shared/services/api/api.service';
import { ArticlesApiUrls } from '../../constants/articles-api-urls.enum';
import type {
  Article,
  ArticleListQueryParam,
  ArticleSlug,
  Tag,
} from '../../types/article.interface';
import type { Comment, CommentRequestPayload } from '../../types/comment.interface';
import type { Username } from '../../../../shared/types/user.interface';
import type { UserProfile } from '../../../../shared/types/user-profile.interface';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  private _apiService = inject(ApiService);

  getAllArticles(queryParams: Partial<ArticleListQueryParam>) {
    return this._apiService.get<{ articles: Article[]; articlesCount: number }>(
      ArticlesApiUrls.GetAllArticles,
      queryParams,
    );
  }

  getFeed(queryParams: Partial<ArticleListQueryParam>) {
    return this._apiService.get<{ articles: Article[]; articlesCount: number }>(
      ArticlesApiUrls.GetFeed,
      queryParams,
    );
  }

  getArticle(slug: ArticleSlug) {
    return this._apiService.get<{ article: Article }>(
      ArticlesApiUrls.GetArticle.replace(':slug', slug),
    );
  }

  favoriteArticle(slug: ArticleSlug) {
    return this._apiService.post<{ article: Article }, void>(
      ArticlesApiUrls.FavoriteArticle.replace(':slug', slug),
    );
  }

  unfavoriteArticle(slug: ArticleSlug) {
    return this._apiService.delete<{ article: Article }>(
      ArticlesApiUrls.FavoriteArticle.replace(':slug', slug),
    );
  }

  addCommentsToArticle(slug: ArticleSlug, comment: CommentRequestPayload) {
    return this._apiService.post<{ comment: Comment }, CommentRequestPayload>(
      ArticlesApiUrls.GetArticle.replace(':slug', slug),
      comment,
    );
  }

  followProfile(username: Username) {
    return this._apiService.post<{ profile: UserProfile }, void>(
      ArticlesApiUrls.FollowProfile.replace(':username', username),
    );
  }

  unfollowProfile(username: Username) {
    return this._apiService.delete<{ profile: UserProfile }>(
      ArticlesApiUrls.FollowProfile.replace(':username', username),
    );
  }

  getAllTags() {
    return this._apiService.get<{ tags: Tag[] }>(ArticlesApiUrls.GetTags);
  }
}
