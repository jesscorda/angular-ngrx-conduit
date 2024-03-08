import type { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { ArticleListComponent } from '../article-list/article-list.component';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { articlePageActions } from '../../store/articles.actions';
import { selectArticles, selectIsLoading } from '../../store/articles.reducer';
import type { ArticleState } from '../../types/article-state.interface';
import { AsyncPipe, NgIf } from '@angular/common';
import { HorizontalDividerComponent } from '../../../../shared/components/horizontal-divider/horizontal-divider.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-articles-page',
  standalone: true,
  imports: [ArticleListComponent, NgIf, AsyncPipe, HorizontalDividerComponent, RouterOutlet],
  templateUrl: './articles-page.component.html',
})
export class ArticlesPageComponent implements OnInit {
  private readonly _store = inject(Store<{ articles: ArticleState }>);

  vm$ = combineLatest({
    articles: this._store.select(selectArticles),
    isLoading: this._store.select(selectIsLoading),
  });

  ngOnInit(): void {
    this._store.dispatch(articlePageActions.getAllArticles({ queryParams: {} }));
  }
}
