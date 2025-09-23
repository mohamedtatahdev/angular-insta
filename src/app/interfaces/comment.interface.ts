import {Author} from './post.interface';

export interface CommentInterface {
  id?: number;
  content: string;
  createdAt?: string;
  picture: { id: number };
  author: Author;
}

export interface CreateCommentDto {
  content: string;
  picture: { id: number };
  author: { id: number };
}
