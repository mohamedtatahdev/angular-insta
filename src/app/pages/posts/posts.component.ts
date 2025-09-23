import {AfterViewInit, Component, computed, effect, ElementRef, inject, output, signal, viewChild} from '@angular/core';
import {PostService} from '../../services/post.service';
import {Post} from './components/post';
import {OverlayComments} from '../comments/overlay-comments';
import {CommentInterface} from '../../interfaces/comment.interface';
import {CommentService} from '../../services/comment.service';

@Component({
  selector: 'app-posts',
  imports: [
    Post,
    OverlayComments
  ],
  template: `
    @for (post of postList(); track post.id) {
      <app-post [post]="post"
                (buttonClicked)="openComments(post.id)"

      >

      ></app-post>    }

    @if (isLast()) {
      <p class="text-center text-gray-500 mt-4">Vous avez tout vu</p>

    } @else {
      <div #loading class="flex justify-center flex-row gap-2 mt-4">
        <div class="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:.7s]"></div>
        <div class="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:.3s]"></div>
        <div class="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:.7s]"></div>
      </div>
    }


    <app-overlay-comments [showComments]="showComments()"
                          (close)="showComments.set(false)"
                          [pictureId]="pictureId()"

    ></app-overlay-comments>

  `,
  styles: ``
})
export class PostsComponent  {
  postService = inject(PostService);
  commentService = inject(CommentService);
  pictureId = this.commentService.pictureId;
  showComments = signal(false);

  isLast = computed(() => this.postService.postResource.value()?.last ?? false);


  loading = viewChild<ElementRef<HTMLDivElement>>('loading');

  postList = computed(() => this.postService.allPosts());


  observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting ) {
      setTimeout(() => {
        this.postService.nextPage();
      },2000)
    }
  });


  oneObserver = effect(() => {

    if (this.postList().length > 0 && this.loading()) {

      this.observer.observe(this.loading()!.nativeElement);
    }
  });

  openComments(postId: number) {
    this.pictureId.set(postId);
    this.showComments.set(true);
  }


}
