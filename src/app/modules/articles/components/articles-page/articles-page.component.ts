import type { OnInit } from '@angular/core';
import { Component, Input, inject } from '@angular/core';
import { ArticleListComponent } from '../article-list/article-list.component';
import { Store } from '@ngrx/store';
import { combineLatest, map, withLatestFrom } from 'rxjs';
import { articlePageActions } from '../../store/articles.actions';
import { selectArticles, selectFeedArticles, selectIsLoading } from '../../store/articles.reducer';
import type { ArticleState } from '../../types/article-state.interface';
import { AsyncPipe, NgIf } from '@angular/common';
import { HorizontalDividerComponent } from '../../../../shared/components/horizontal-divider/horizontal-divider.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { TagComponent } from '../../../../shared/components/tag/tag.component';

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
  ],
  templateUrl: './articles-page.component.html',
})
export class ArticlesPageComponent implements OnInit {
  @Input() type!: string;

  private readonly _store = inject(Store<{ articles: ArticleState }>);

  private _route = inject(ActivatedRoute);

  listType$ = this._route.paramMap.pipe(
    withLatestFrom(this._route.queryParams),
    map(([params, routeQueryParams]) => {
      if (params.get('type') === 'feed') {
        this._store.dispatch(articlePageActions.getFeed({ queryParams: routeQueryParams }));
      } else {
        this._store.dispatch(articlePageActions.getAllArticles({ queryParams: routeQueryParams }));
      }
    }),
  );

  filtersToDisplay$ = this._route.queryParams.pipe(
    map(params => {
      if (Object.keys(params).length === 0) return [];
      const filtersToDisplay = Object.entries(params).map(paramObj => paramObj.join(': '));
      return filtersToDisplay;
    }),
  );

  vm$ = combineLatest({
    articles: this._store.select(selectArticles),
    feedArticles: this._store.select(selectFeedArticles),
    isLoading: this._store.select(selectIsLoading),
    filtersToDisplay: this.filtersToDisplay$,
    listType: this.listType$,
  });

  ngOnInit(): void {
    // this._store.dispatch(articlePageActions.getAllArticles({ queryParams: {} }));
  }
}
