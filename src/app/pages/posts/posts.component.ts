import {Component, computed, effect, ElementRef, inject, OnDestroy, signal, viewChild} from '@angular/core';
import {PostService} from '../../services/post.service';
import {Post} from './components/post';
import {OverlayComments} from '../comments/overlay-comments';
import {CommentService} from '../../services/comment.service';

@Component({
  selector: 'app-posts',
  imports: [
    Post,
    OverlayComments
  ],
  template: `
    @for (post of postList(); track post.id) {
      <app-post
        [post]="post"
        (buttonClicked)="openComments(post.id)"
      />
    }

    @if (isLast()) {
      <p class="text-center text-gray-500 mt-4">Vous avez tout vu</p>
    } @else {
      <div #loading class="flex justify-center flex-row gap-2 mt-4">
        <div class="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:.7s]"></div>
        <div class="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:.3s]"></div>
        <div class="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:.7s]"></div>
      </div>
    }

    <app-overlay-comments
      [showComments]="showComments()"
      [pictureId]="pictureId()"
      (close)="closeComments()"
    />
  `,
  styles: ``
})
export class PostsComponent implements OnDestroy {
  private postService = inject(PostService);
  private commentService = inject(CommentService);

  pictureId = signal(0);
  showComments = signal(false);

  isLast = computed(() => this.postService.postResource.value()?.last ?? false);
  postList = computed(() => this.postService.allPosts());
  loading = viewChild<ElementRef<HTMLDivElement>>('loading');

  private observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      setTimeout(() => {
        this.postService.nextPage();
      }, 2000);
    }
  });

  constructor() {
    // ✅ S'assurer qu'on charge TOUS les posts
    this.postService.loadAllPosts();

    effect(() => {
      if (this.postList().length > 0 && this.loading()) {
        this.observer.observe(this.loading()!.nativeElement);
      }
    });
  }

  ngOnDestroy() {
    this.observer.disconnect();
    this.postService.reset();
  }
  openComments(postId: number) {
    this.pictureId.set(postId);
    this.commentService.pictureId.set(postId);
    this.showComments.set(true);
  }

  closeComments() {
    this.showComments.set(false);
  }

}
