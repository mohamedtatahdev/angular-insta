import {Component, computed, effect, inject, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs/operators';
import {OverlayComments} from '../comments/overlay-comments';
import {Post} from './components/post';
import {PostService} from '../../services/post.service';
import {CommentService} from '../../services/comment.service';

@Component({
  selector: 'app-post-user-id',
  imports: [
    OverlayComments,
    Post
  ],
  template: `
    @for (post of postList(); track post.id) {
      <app-post
        [post]="post"
        (buttonClicked)="openComments(post.id)"
      />
    }

    <app-overlay-comments
      [showComments]="showComments()"
      [pictureId]="pictureId()"
      (close)="closeComments()"
    />
  `,
  styles: ``
})
export class PostUserId {
  private postService = inject(PostService);
  private commentService = inject(CommentService);
  private route = inject(ActivatedRoute);

  pictureId = signal(0);
  showComments = signal(false);

  // ✅ Récupérer l'ID utilisateur depuis la route
  userId = toSignal(
    this.route.params.pipe(map(params => +params['id'])),
    { initialValue: 0 }
  );

  postList = computed(() => this.postService.allPosts());

  constructor() {
    // ✅ Charger les posts de l'utilisateur quand l'ID change
    effect(() => {
      const id = this.userId();
      if (id > 0) {
        this.postService.setUser(id);
      }
    });
  }

  openComments(postId: number) {
    this.pictureId.set(postId);
    this.commentService.pictureId.set(postId);
    this.showComments.set(true);
  }

  closeComments() {
    this.showComments.set(false);
  }

  ngOnDestroy() {
    this.postService.reset();
  }
}
