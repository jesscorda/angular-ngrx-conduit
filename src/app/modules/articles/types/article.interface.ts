import type { UserProfile } from '../../../shared/types/user-profile.interface';
import type { Username } from '../../../shared/types/user.interface';

export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: Tag[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: UserProfile;
}

export type ArticleSlug = Article['slug'];

export type Tag = string;

export type ArticleListQueryParam = {
  tag: Tag;
  author: Username;
  favorited: Username;
  limit: number;
  offset: number;
  type: 'feed' | 'articles';
};
