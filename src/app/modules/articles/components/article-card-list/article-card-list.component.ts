import { Component, Input } from '@angular/core';
import type { Article } from '../../types/article.interface';
import { ArticleCardComponent } from '../article-card/article-card.component';
import { EmptyDataIndicatorComponent } from '../../../../shared/components/empty-data-indicator/empty-data-indicator.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-article-card-list',
  standalone: true,
  imports: [ArticleCardComponent, EmptyDataIndicatorComponent, NgClass],
  templateUrl: './article-card-list.component.html',
})
export class ArticleCardListComponent {
  @Input({ required: true }) articles: Article[] = [];

  @Input() columns: number = 1;

  getGridColumnClass(): string {
    return `grid-cols-${this.columns}`;
  }
}
