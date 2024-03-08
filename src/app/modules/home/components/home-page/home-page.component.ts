import type { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { articlePageActions } from '../../../articles/store/articles.actions';
import {
  selectArticles,
  selectFeedArticles,
  selectIsLoading,
  selectTags,
} from '../../../articles/store/articles.reducer';
import type { ArticleState } from '../../../articles/types/article-state.interface';
import { CommonModule } from '@angular/common';
import { ArticleListComponent } from '../../../articles/components/article-list/article-list.component';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { HorizontalDividerComponent } from '../../../../shared/components/horizontal-divider/horizontal-divider.component';
import { ActionButtonComponent } from '../../../../shared/components/action-button/action-button.component';
import { RouterLink } from '@angular/router';
import { TagComponent } from '../../../../shared/components/tag/tag.component';
import { ArticleCardListComponent } from '../../../articles/components/article-card-list/article-card-list.component';
import { AppRoutes } from '../../../../shared/constants/app-route-names.enum';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    ArticleListComponent,
    LoaderComponent,
    HorizontalDividerComponent,
    ActionButtonComponent,
    RouterLink,
    TagComponent,
    ArticleCardListComponent,
  ],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit {
  private readonly _store = inject(Store<{ articles: ArticleState }>);

  readonly articlesRoute = `/${AppRoutes.Articles}`;

  vm$ = combineLatest({
    articles: this._store.select(selectArticles),
    isLoading: this._store.select(selectIsLoading),
    tags: this._store.select(selectTags),
    feedArticles: this._store.select(selectFeedArticles),
  });

  ngOnInit(): void {
    this._store.dispatch(articlePageActions.getAllArticles({ queryParams: {} }));
    this._store.dispatch(articlePageActions.getTags());
    this._store.dispatch(articlePageActions.getFeed());
  }
}
