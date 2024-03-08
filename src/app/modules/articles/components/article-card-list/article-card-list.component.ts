import { Component, Input } from '@angular/core';
import type { Article } from '../../types/article.interface';
import { ArticleCardComponent } from '../article-card/article-card.component';
import { EmptyDataIndicatorComponent } from '../../../../shared/components/empty-data-indicator/empty-data-indicator.component';

@Component({
  selector: 'app-article-card-list',
  standalone: true,
  imports: [ArticleCardComponent, EmptyDataIndicatorComponent],
  templateUrl: './article-card-list.component.html',
})
export class ArticleCardListComponent {
  @Input({ required: true }) articles: Article[] = [];
}
