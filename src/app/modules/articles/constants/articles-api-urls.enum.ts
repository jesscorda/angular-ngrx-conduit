export enum ArticlesApiUrls {
  GetAllArticles = 'api/articles',
  GetFeed = 'api/articles/feed',
  GetArticle = 'api/articles/:slug',
  FavoriteArticle = 'api/articles/:slug/favorite',
  AddCommentToArticleArticle = 'api/articles/:slug/comments',
  FollowProfile = 'api/profiles/:username/follow',
  GetTags = 'api/tags',
}
