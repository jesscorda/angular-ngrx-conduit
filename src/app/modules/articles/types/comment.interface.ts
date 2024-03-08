import type { UserProfile } from '../../../shared/types/user-profile.interface';

export interface Comment {
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: UserProfile;
}

export type CommentRequestPayload = {
  comment: {
    body: Comment['body'];
  };
};
