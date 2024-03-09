import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ArticleActionNames } from '../constants/article-action-names.enum';
import type { Article, ArticleListQueryParam, ArticleSlug, Tag } from '../types/article.interface';
import type { BackendErrors } from '../../../shared/types/backend-errors.interface';
import type { Comment, CommentRequestPayload } from '../types/comment.interface';
import type { Username } from '../../../shared/types/user.interface';
import type { UserProfile } from '../../../shared/types/user-profile.interface';

export const articlePageActions = createActionGroup({
  source: 'articles',
  events: {
    [ArticleActionNames.GetAllArticles]: props<{ queryParams: Partial<ArticleListQueryParam> }>(),
    [ArticleActionNames.GetAllArticlesSuccess]: props<{
      articles: Article[];
      articlesCount: number;
    }>(),
    [ArticleActionNames.GetAllArticlesFailure]: props<BackendErrors>(),
    [ArticleActionNames.GetArticle]: props<{
      slug: ArticleSlug;
    }>(),
    [ArticleActionNames.GetArticleSuccess]: props<{ article: Article }>(),
    [ArticleActionNames.GetArticleFailure]: props<BackendErrors>(),
    [ArticleActionNames.FavoriteArticle]: props<{
      slug: ArticleSlug;
    }>(),
    [ArticleActionNames.FavoriteArticleSuccess]: props<{ article: Article }>(),
    [ArticleActionNames.FavoriteArticleFailure]: props<BackendErrors>(),
    [ArticleActionNames.UnfavoriteArticle]: props<{
      slug: ArticleSlug;
    }>(),
    [ArticleActionNames.UnfavoriteArticleSuccess]: props<{ article: Article }>(),
    [ArticleActionNames.UnfavoriteArticleFailure]: props<BackendErrors>(),
    [ArticleActionNames.AddCommentToArticle]: props<{
      slug: ArticleSlug;
      comment: CommentRequestPayload;
    }>(),
    [ArticleActionNames.AddCommentToArticleSuccess]: props<{ comment: Comment }>(),
    [ArticleActionNames.AddCommentToArticleFailure]: props<BackendErrors>(),
    [ArticleActionNames.FollowProfile]: props<{
      username: Username;
    }>(),
    [ArticleActionNames.FollowProfileSuccess]: props<{ profile: UserProfile }>(),
    [ArticleActionNames.FollowProfileFailure]: props<BackendErrors>(),
    [ArticleActionNames.UnfollowProfile]: props<{
      username: Username;
    }>(),
    [ArticleActionNames.UnfollowProfileSuccess]: props<{ profile: UserProfile }>(),
    [ArticleActionNames.UnfollowProfileFailure]: props<BackendErrors>(),
    [ArticleActionNames.GetTags]: emptyProps(),
    [ArticleActionNames.GetTagsSuccess]: props<{ tags: Tag[] }>(),
    [ArticleActionNames.GetTagsFailure]: props<BackendErrors>(),
    [ArticleActionNames.GetFeed]: props<{ queryParams: Partial<ArticleListQueryParam> }>(),
    [ArticleActionNames.GetFeedSuccess]: props<{ articles: Article[]; articlesCount: number }>(),
    [ArticleActionNames.GetFeedFailure]: props<BackendErrors>(),
  },
});
