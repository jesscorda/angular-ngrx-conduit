import { createFeature, createReducer, on } from '@ngrx/store';
import type { ArticleState } from '../types/article-state.interface';
import { articlePageActions } from './articles.actions';

const initialArticlesState: ArticleState = {
  isLoading: false,
  articles: [],
  errors: null,
  article: null,
  comments: [],
  tags: [],
  feedArticles: [],
  filters: {},
};

export const articleFeature = createFeature({
  name: 'articles',
  reducer: createReducer(
    initialArticlesState,
    on(articlePageActions.getAllArticles, (state, action) => ({
      ...state,
      isLoading: true,
      filters: action.queryParams,
    })),
    on(articlePageActions.getAllArticlesSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      articles: action.articles,
    })),
    on(articlePageActions.getAllArticlesFailure, (state, action) => ({
      ...state,
      isLoading: false,
      errors: action,
    })),
    on(articlePageActions.getArticle, state => ({ ...state, isLoading: true })),
    on(articlePageActions.getArticleSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      article: action.article,
    })),
    on(articlePageActions.getArticleFailure, (state, action) => ({
      ...state,
      isLoading: false,
      errors: action,
    })),
    on(articlePageActions.favoriteArticle, state => ({ ...state, isLoading: true })),
    on(articlePageActions.favoriteArticleSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      article: action.article,
    })),
    on(articlePageActions.favoriteArticleFailure, (state, action) => ({
      ...state,
      isLoading: false,
      errors: action,
    })),
    on(articlePageActions.unfavoriteArticle, state => ({ ...state, isLoading: true })),
    on(articlePageActions.unfavoriteArticleSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      article: action.article,
    })),
    on(articlePageActions.unfavoriteArticleFailure, (state, action) => ({
      ...state,
      isLoading: false,
      errors: action,
    })),
    on(articlePageActions.addCommentToArticle, state => ({ ...state, isLoading: true })),
    on(articlePageActions.addCommentToArticleSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      comments: [...state.comments, action.comment],
    })),
    on(articlePageActions.addCommentToArticleFailure, (state, action) => ({
      ...state,
      isLoading: false,
      errors: action,
    })),
    on(articlePageActions.followProfile, state => ({ ...state, isLoading: true })),
    on(articlePageActions.followProfileSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      article: state.article ? { ...state.article, author: action.profile } : null,
    })),
    on(articlePageActions.followProfileFailure, (state, action) => ({
      ...state,
      isLoading: false,
      errors: action,
    })),
    on(articlePageActions.unfollowProfile, state => ({ ...state, isLoading: true })),
    on(articlePageActions.unfollowProfileSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      article: state.article ? { ...state.article, author: action.profile } : null,
    })),
    on(articlePageActions.unfollowProfileFailure, (state, action) => ({
      ...state,
      isLoading: false,
      errors: action,
    })),
    on(articlePageActions.getTags, state => ({ ...state, isLoading: true })),
    on(articlePageActions.getTagsSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      tags: action.tags,
    })),
    on(articlePageActions.getTagsFailure, (state, action) => ({
      ...state,
      isLoading: false,
      errors: action,
    })),
    on(articlePageActions.getFeed, (state, action) => ({
      ...state,
      isLoading: true,
      filters: action.queryParams,
    })),
    on(articlePageActions.getFeedSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      feedArticles: action.articles,
    })),
    on(articlePageActions.getFeedFailure, (state, action) => ({
      ...state,
      isLoading: false,
      errors: action,
    })),
  ),
});

export const {
  name: articlesFeatureKey,
  reducer: articlesReducer,
  selectArticles,
  selectArticlesState,
  selectErrors,
  selectIsLoading,
  selectArticle,
  selectComments,
  selectTags,
  selectFeedArticles,
} = articleFeature;
