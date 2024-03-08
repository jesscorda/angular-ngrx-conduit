import { Component, Input } from '@angular/core';
import type { Article } from '../../types/article.interface';
import { AvatarComponent } from '../../../../shared/components/avatar/avatar.component';
import { DatePipe, NgClass, SlicePipe } from '@angular/common';
import { TagComponent } from '../../../../shared/components/tag/tag.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroHeartSolid } from '@ng-icons/heroicons/solid';
import { RouterLink } from '@angular/router';
import { HorizontalDividerComponent } from '../../../../shared/components/horizontal-divider/horizontal-divider.component';
import { ActionButtonComponent } from '../../../../shared/components/action-button/action-button.component';
import { AppRoutes } from '../../../../shared/constants/app-route-names.enum';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [
    AvatarComponent,
    DatePipe,
    TagComponent,
    NgClass,
    NgIconComponent,
    SlicePipe,
    RouterLink,
    HorizontalDividerComponent,
    ActionButtonComponent,
  ],
  templateUrl: './article.component.html',
  providers: [provideIcons({ heroHeartSolid })],
})
export class ArticleComponent {
  @Input({ required: true }) article!: Article;

  readonly articlesRoute = `/${AppRoutes.Articles}`;

  readonly profileRoute = `/${AppRoutes.Profile}`;
}
