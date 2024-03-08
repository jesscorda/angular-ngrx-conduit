import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from '../article/article.component';
import type { Article } from '../../types/article.interface';
import { RouterOutlet } from '@angular/router';
import { EmptyDataIndicatorComponent } from '../../../../shared/components/empty-data-indicator/empty-data-indicator.component';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule, ArticleComponent, RouterOutlet, EmptyDataIndicatorComponent],
  templateUrl: './article-list.component.html',
})
export class ArticleListComponent {
  @Input({ required: true }) articles: Article[] = [];
}
