import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ArticlesService } from '../services/articles/articles.service';
import { articlePageActions } from './articles.actions';
import { catchError, map, of, switchMap } from 'rxjs';

export const getAllArticles = createEffect(
  (actions$ = inject(Actions), articlesService = inject(ArticlesService)) => {
    return actions$.pipe(
      ofType(articlePageActions.getAllArticles),
      switchMap(action =>
        articlesService.getAllArticles(action.queryParams).pipe(
          map(response => articlePageActions.getAllArticlesSuccess(response)),
          catchError(error => of(articlePageActions.getAllArticlesFailure(error))),
        ),
      ),
    );
  },
  { functional: true },
);

export const getArticle = createEffect(
  (actions$ = inject(Actions), articlesService = inject(ArticlesService)) => {
    return actions$.pipe(
      ofType(articlePageActions.getArticle),
      switchMap(action =>
        articlesService.getArticle(action.slug).pipe(
          map(articles => articlePageActions.getArticleSuccess(articles)),
          catchError(error => of(articlePageActions.getArticleFailure(error))),
        ),
      ),
    );
  },
  { functional: true },
);

export const favoriteArticle = createEffect(
  (actions$ = inject(Actions), articlesService = inject(ArticlesService)) => {
    return actions$.pipe(
      ofType(articlePageActions.favoriteArticle),
      switchMap(action =>
        articlesService.favoriteArticle(action.slug).pipe(
          map(articles => articlePageActions.favoriteArticleSuccess(articles)),
          catchError(error => of(articlePageActions.favoriteArticleFailure(error))),
        ),
      ),
    );
  },
  { functional: true },
);

export const unfavoriteArticle = createEffect(
  (actions$ = inject(Actions), articlesService = inject(ArticlesService)) => {
    return actions$.pipe(
      ofType(articlePageActions.unfavoriteArticle),
      switchMap(action =>
        articlesService.unfavoriteArticle(action.slug).pipe(
          map(articles => articlePageActions.unfavoriteArticleSuccess(articles)),
          catchError(error => of(articlePageActions.unfavoriteArticleFailure(error))),
        ),
      ),
    );
  },
  { functional: true },
);

export const addCommentsToArticle = createEffect(
  (actions$ = inject(Actions), articlesService = inject(ArticlesService)) => {
    return actions$.pipe(
      ofType(articlePageActions.addCommentToArticle),
      switchMap(action =>
        articlesService.addCommentsToArticle(action.slug, action.comment).pipe(
          map(comment => articlePageActions.addCommentToArticleSuccess(comment)),
          catchError(error => of(articlePageActions.addCommentToArticleFailure(error))),
        ),
      ),
    );
  },
  { functional: true },
);

export const followProfile = createEffect(
  (actions$ = inject(Actions), articlesService = inject(ArticlesService)) => {
    return actions$.pipe(
      ofType(articlePageActions.followProfile),
      switchMap(action =>
        articlesService.followProfile(action.username).pipe(
          map(profile => articlePageActions.followProfileSuccess(profile)),
          catchError(error => of(articlePageActions.followProfileFailure(error))),
        ),
      ),
    );
  },
  { functional: true },
);

export const unfollowProfile = createEffect(
  (actions$ = inject(Actions), articlesService = inject(ArticlesService)) => {
    return actions$.pipe(
      ofType(articlePageActions.unfollowProfile),
      switchMap(action =>
        articlesService.unfollowProfile(action.username).pipe(
          map(profile => articlePageActions.unfollowProfileSuccess(profile)),
          catchError(error => of(articlePageActions.unfollowProfileFailure(error))),
        ),
      ),
    );
  },
  { functional: true },
);

export const getTags = createEffect(
  (actions$ = inject(Actions), articlesService = inject(ArticlesService)) => {
    return actions$.pipe(
      ofType(articlePageActions.getTags),
      switchMap(_ =>
        articlesService.getAllTags().pipe(
          map(tags => articlePageActions.getTagsSuccess(tags)),
          catchError(error => of(articlePageActions.getTagsFailure(error))),
        ),
      ),
    );
  },
  { functional: true },
);

export const getFeed = createEffect(
  (actions$ = inject(Actions), articlesService = inject(ArticlesService)) => {
    return actions$.pipe(
      ofType(articlePageActions.getFeed),
      switchMap(action =>
        articlesService.getFeed(action.queryParams).pipe(
          map(articles => articlePageActions.getFeedSuccess(articles)),
          catchError(error => of(articlePageActions.getFeedFailure(error))),
        ),
      ),
    );
  },
  { functional: true },
);
