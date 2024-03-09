import type { Route } from '@angular/router';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { ArticleRouteNames } from '../constants/article-route-names.enum';

export const ARTICLE_ROUTES: Route[] = [
  {
    path: ArticleRouteNames.ShowAllArticles,
    loadComponent: () =>
      import('./articles-wrapper/articles-wrapper.component').then(c => c.ArticlesWrapperComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./articles-page/articles-page.component').then(c => c.ArticlesPageComponent),
      },
      {
        path: ArticleRouteNames.ShowArticle,
        component: ArticleDetailsComponent,
      },
    ],
  },
];
