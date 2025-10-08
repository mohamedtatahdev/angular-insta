import {effect, inject, Injectable, resource, signal} from '@angular/core';
import {PaginatedPostsResponse} from '../interfaces/paginated.interface';
import {PostInterface, PostRequest} from '../interfaces/post.interface';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  BASE_URL = 'http://localhost:8080/api/picture'
  private readonly http = inject(HttpClient);

  pictureId = signal(0);
  userId = signal(0);
  page = signal(0);
  size = signal(5);
  allPosts = signal<PostInterface[]>([]);

  postResourceByUser = resource({
    params: () => ({ page: this.page(), size: this.size(), userId: this.userId() }),
    loader: async () =>
      (await fetch(`${this.BASE_URL}/user/${this.userId()}?pageNumber=${this.page()}&pageSize=${this.size()}`)).json(),
  });

  postResource = resource({
    params: () => ({ page: this.page(), size: this.size() }),
    loader: async (): Promise<PaginatedPostsResponse> =>
      (await fetch(`${this.BASE_URL}?pageNumber=${this.page()}&pageSize=${this.size()}`)).json(),
  })

  postResourceUnique = resource({
    params: () => ({ pictureId: this.pictureId() }),
    loader: async () => {
      return (await fetch(`${this.BASE_URL}/${this.pictureId()}`)).json();
    }
  })

  constructor() {
    effect(() => {
      const response = this.userId() ? this.postResourceByUser.value() : this.postResource.value();

      if (response?.content) {
        if (this.page() === 0) {
          this.allPosts.set([...response.content]);
        } else {
          this.allPosts.update(current => [...current, ...response.content]);
        }
      }
    });
  }

  nextPage() {
    this.page.update(p => p + 1);
  }

  reset() {
    this.page.set(0);
    this.userId.set(0);
    this.allPosts.set([]);
  }

  // ✅ NOUVELLE MÉTHODE pour charger les posts d'un utilisateur
  setUser(userId: number) {
    this.userId.set(userId);
    this.page.set(0);
    this.allPosts.set([]);
    // Le changement de userId et page va automatiquement déclencher le rechargement
  }

  // ✅ NOUVELLE MÉTHODE pour revenir à tous les posts
  loadAllPosts() {
    this.userId.set(0);
    this.page.set(0);
    this.allPosts.set([]);
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
