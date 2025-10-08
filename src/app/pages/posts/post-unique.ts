import {Component, computed, effect, inject, signal} from '@angular/core';
import {PostService} from '../../services/post.service';
import {RouterLink, ActivatedRoute} from '@angular/router';
import {CommentService} from '../../services/comment.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-post-unique',
  imports: [RouterLink],
  template: `
    <div class="max-w-md mx-auto bg-white rounded shadow p-4">
      <h2 class="text-lg font-semibold mb-2">{{ post()?.title }}</h2>
      <p class="text-sm text-gray-600 mb-2">{{ post()?.description }}</p>

      <!-- Image -->
      <img [src]="post()?.imageLink" alt="{{ post()?.title }}" class="w-full rounded mb-2">

      <!-- Auteur -->
      <p class="text-xs text-gray-500">
        Posté par {{ post()?.author?.username }}
      </p>

      <div class="mt-4">
        <h3 class="font-semibold mb-2">Commentaires</h3>
        @for (comment of comments(); track comment.id) {
          <div class="border-b pb-2 mb-2">
            <p class="text-sm">{{ comment.content }}</p>
            <p class="text-xs text-gray-500">Par {{ comment.author?.username }}</p>
          </div>
        }
        @empty {
          <p class="text-gray-400 text-sm">Aucun commentaire</p>
        }
      </div>
    </div>
  `,
  styles: ``
})
export class PostUnique {
  postService = inject(PostService);
  commentService = inject(CommentService);
  private route = inject(ActivatedRoute);

  postId = toSignal(
    this.route.params.pipe(map(params => +params['id'])),
    { initialValue: 0 }
  );

  constructor() {
    effect(() => {
      const id = this.postId();
      if (id > 0) {
        this.postService.pictureId.set(id);
        this.commentService.pictureId.set(id);
      }
    });
  }

  comments = computed(() => this.commentService.commentResource.value() || []);
  post = computed(() => this.postService.postResourceUnique.value());
}
