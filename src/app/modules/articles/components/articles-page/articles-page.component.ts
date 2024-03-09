import { Component, Input, inject } from '@angular/core';
import { ArticleListComponent } from '../article-list/article-list.component';
import { Store } from '@ngrx/store';
import { combineLatest, map } from 'rxjs';
import { articlePageActions } from '../../store/articles.actions';
import {
  selectArticles,
  selectArticlesCount,
  selectFeedArticles,
  selectFilters,
  selectIsLoading,
} from '../../store/articles.reducer';
import type { ArticleState } from '../../types/article-state.interface';
import { AsyncPipe, NgIf } from '@angular/common';
import { HorizontalDividerComponent } from '../../../../shared/components/horizontal-divider/horizontal-divider.component';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { TagComponent } from '../../../../shared/components/tag/tag.component';
import { PaginatorComponent } from '../../../../shared/components/paginator/paginator.component';
import type { Paginator } from '../../../../shared/types/paginator.interface';

@Component({
  selector: 'app-articles-page',
  standalone: true,
  imports: [
    ArticleListComponent,
    NgIf,
    AsyncPipe,
    HorizontalDividerComponent,
    RouterOutlet,
    TagComponent,
    PaginatorComponent,
  ],
  templateUrl: './articles-page.component.html',
})
export class ArticlesPageComponent {
  @Input() type!: string;

  private readonly _store = inject(Store<{ articles: ArticleState }>);

  private _route = inject(ActivatedRoute);

  private _router = inject(Router);

  listType$ = combineLatest([this._route.paramMap, this._route.queryParams]).pipe(
    map(([params, routeQueryParams]) => {
      if (params.get('type') === 'feed') {
        this._store.dispatch(
          articlePageActions.getFeed({
            queryParams: {
              ...routeQueryParams,
              offset: Number(routeQueryParams['offset']),
              limit: Number(routeQueryParams['limit']),
            },
          }),
        );
      } else {
        this._store.dispatch(
          articlePageActions.getAllArticles({
            queryParams: {
              ...routeQueryParams,
              offset: Number(routeQueryParams['offset']),
              limit: Number(routeQueryParams['limit']),
            },
          }),
        );
      }
    }),
  );

  filtersToDisplay$ = this._route.queryParams.pipe(
    map(params => {
      if (Object.keys(params).length === 0) return [];
      const FILTERS_TO_EXCLUDE = ['offset', 'limit'];
      const filtersToDisplay = Object.entries(params)
        .filter(paramObj => !paramObj.some(val => FILTERS_TO_EXCLUDE.includes(val)))
        .map(paramObj => paramObj.join(': '));
      return filtersToDisplay;
    }),
  );

  vm$ = combineLatest({
    articles: this._store.select(selectArticles),
    feedArticles: this._store.select(selectFeedArticles),
    articlesCount: this._store.select(selectArticlesCount),
    isLoading: this._store.select(selectIsLoading),
    filters: this._store.select(selectFilters),
    filtersToDisplay: this.filtersToDisplay$,
    listType: this.listType$,
  });

  onPreviousPress(paginator: Paginator): void {
    this._router.navigate([], {
      queryParamsHandling: 'merge',
      queryParams: {
        offset: Number(paginator.offset) - Number(paginator.limit),
        limit: Number(paginator.limit),
      },
    });
  }

  onNextPress(paginator: Paginator): void {
    this._router.navigate([], {
      queryParamsHandling: 'merge',
      queryParams: {
        offset: Number(paginator.offset) + Number(paginator.limit),
        limit: Number(paginator.limit),
      },
    });
  }
}
