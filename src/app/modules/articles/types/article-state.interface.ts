import type { BackendErrors } from '../../../shared/types/backend-errors.interface';
import type { Article, Tag } from './article.interface';
import type { Comment } from './comment.interface';

export interface ArticleState {
  isLoading: boolean;
  articles: Article[];
  errors: BackendErrors | null;
  article: Article | null;
  comments: Comment[];
  tags: Tag[];
  feedArticles: Article[];
}
