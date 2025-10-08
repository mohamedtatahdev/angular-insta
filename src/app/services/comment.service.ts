import {inject, Injectable, resource, signal} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {CommentInterface, CreateCommentDto} from '../interfaces/comment.interface';
import {PaginatedPostsResponse} from '../interfaces/paginated.interface';


@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private readonly http = inject(HttpClient);
  pictureId = signal<number | null>(null);


  BASE_URL = 'http://localhost:8080/api'

  addComment(data: CreateCommentDto) {
    return this.http.post<CommentInterface>(
      `${this.BASE_URL}/comment`,
      data,
      {
        withCredentials: true
      }
    );
  }


  commentResource = resource({
    params: () => ({ id: this.pictureId() }),
    loader: async (params) => {
      if (this.pictureId() === null) {
        return null;
      } else {
        return (await fetch(`${this.BASE_URL}/picture/${this.pictureId()}/comment`)).json();
      }
    },
  })



}
