import { Component, Input } from '@angular/core';
import type { Article } from '../../types/article.interface';
import { DatePipe, SlicePipe } from '@angular/common';
import { AvatarComponent } from '../../../../shared/components/avatar/avatar.component';
import { RouterLink } from '@angular/router';
import { AppRoutes } from '../../../../shared/constants/app-route-names.enum';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [AvatarComponent, DatePipe, RouterLink, SlicePipe],
  templateUrl: './article-card.component.html',
})
export class ArticleCardComponent {
  @Input({ required: true }) article!: Article;

  readonly articlesRoute = `/${AppRoutes.Articles}/all`;

  readonly profileRoute = `/${AppRoutes.Profile}`;
}
