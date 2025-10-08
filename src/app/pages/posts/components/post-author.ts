import {Component, inject, input, OnInit} from '@angular/core';
import {Author, PostInterface} from '../../../interfaces/post.interface';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {fontAwesomeIcons} from '../../../shared/font-awesome-icons';
import {TimeAgoPipe} from '../../../shared/pipes/time-ago-pipe';
import {RouterLink} from '@angular/router';
import {PostService} from '../../../services/post.service';

@Component({
  selector: 'app-post-author',
  imports: [
    FontAwesomeModule,
    RouterLink,
    TimeAgoPipe

  ],
  template: `
    <header class="flex flex-row items-center justify-between p-2 mb-2">
      <div class="flex flex-row items-center justify-center gap-1">


        <div class="flex flex-col">
          <a [routerLink]="['/posts/user', author().id]" (click)="openUserPosts(author().id)" class="text-lg">{{ author().username}}</a>
          <span class="text-xs text-gray-700">{{dateCreated().createdAt | timeAgo }}</span>
        </div>
      </div>
      <div>
        <fa-icon icon="ellipsis"></fa-icon>
      </div>
    </header>
  `,
  styles: ``
})
export class PostAuthor implements OnInit {
  author = input.required<Author>();
  dateCreated = input.required<PostInterface>();
  private faIconeLibrary = inject(FaIconLibrary);
  private postService = inject(PostService);


  ngOnInit(): void {
    this.initFontAwesome();
  }

  initFontAwesome() {
    this.faIconeLibrary.addIcons(...fontAwesomeIcons);
  }


  openUserPosts(userId: number) {
    this.postService.page.set(0);
    this.postService.allPosts.set([]);
    this.postService.userId.set(userId); // <-- important
    this.postService.postResourceByUser.reload();
  }


}
