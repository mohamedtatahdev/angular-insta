import {effect, inject, Injectable, resource, signal} from '@angular/core';
import {PaginatedPostsResponse} from '../interfaces/paginated.interface';
import {PostInterface, PostRequest} from '../interfaces/post.interface';
import {CommentInterface} from '../interfaces/comment.interface';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  BASE_URL = 'http://localhost:8080/api/picture'
  private readonly http = inject(HttpClient);


  page = signal(0);
  size = signal(5);
  allPosts = signal<PostInterface[]>([]);


  postResource = resource({
    params: () => ({ page: this.page(), size: this.size() }),

    loader: async (): Promise<PaginatedPostsResponse> =>
      (await fetch(`${this.BASE_URL}?pageNumber=${this.page()}&pageSize=${this.size()}`)).json(),
  })

  constructor() {
    effect(() => {
      const response = this.postResource.value();
      if (response?.content) {
        this.allPosts.update(current => [...current, ...response.content]);
      }
    });
  }

  nextPage() {
    this.page.update(p => p + 1);
  }

  reset() {
    this.page.set(0);
    this.allPosts.set([]);
    this.postResource.reload();
  }

  addPost(data: PostRequest) {
    const token = localStorage.getItem('basicToken');

    return this.http.post<PostInterface>(
      `${this.BASE_URL}`,
      data,

      {
        headers: {
          'Authorization': `Basic ${token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }
    );
  }

  uploadImage(file: File) {
    const formData = new FormData();
    formData.append('image', file);

    return this.http.post<{ filename: string }>(
      `${this.BASE_URL}/upload`,
      formData,
      {
        headers: {
          'Authorization': `Basic ${localStorage.getItem('basicToken')}`
        },
        withCredentials: true
      }
    );
  }




}
