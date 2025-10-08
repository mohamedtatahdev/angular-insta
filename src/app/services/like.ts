import {inject, Injectable, signal} from '@angular/core';
import {CommentInterface, CreateCommentDto} from '../interfaces/comment.interface';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Like {

  likePostIds = signal<number[]>([])
  private readonly http = inject(HttpClient);

  BASE_URL = 'http://localhost:8080/api/picture'

  likePost(id: number) {

    this.likePostIds.update((postLiked) => {
      if (postLiked.includes(id)) {
        return postLiked.filter(postId => postId !== id);

      } else {
        return [...postLiked, id];
      }
    });

    return this.http.patch(
      `${this.BASE_URL}/${id}/like`,
      {},
      {
        withCredentials: true
      }
    );
  }

}
