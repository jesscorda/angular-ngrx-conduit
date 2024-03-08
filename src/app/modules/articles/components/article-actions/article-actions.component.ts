import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroHeart, heroChatBubbleBottomCenterText } from '@ng-icons/heroicons/outline';
import { heroHeartSolid } from '@ng-icons/heroicons/solid';
import { Comment } from '../../types/comment.interface';
import type { Article } from '../../types/article.interface';

@Component({
  selector: 'app-article-actions',
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: './article-actions.component.html',
  providers: [provideIcons({ heroHeartSolid, heroHeart, heroChatBubbleBottomCenterText })],
})
export class ArticleActionsComponent {
  @Input({ required: true }) article!: Article | null;

  @Output() toggleFavoriteArticle = new EventEmitter<void>();

  onToggleFavoriteArticle(): void {
    this.toggleFavoriteArticle.emit();
  }

  onComment(): void {}
}
