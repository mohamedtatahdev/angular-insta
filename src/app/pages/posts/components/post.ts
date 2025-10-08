import {Component, input, output} from '@angular/core';
import {PostAuthor} from './post-author';
import {PostInteraction} from './post-interaction';
import {PostArticle} from './post-article';
import {PostInterface} from '../../../interfaces/post.interface';

@Component({
  selector: 'app-post',
  imports: [
    PostAuthor,
    PostInteraction,
    PostArticle
  ],
  template: `
    <div class=" mt-2 w-full bg-white ">
    <app-post-author [dateCreated]="post()" [author]="post().author"/>
    <app-post-article [post] = "post()"/>
    <app-post-interaction [post] = "post()" (likeClick)="this.likeClicked.emit()" (buttonClick)="handleEvent()"/>
    </div>
  `,
  styles: ``
})
export class Post {
  post = input.required<PostInterface>()

  buttonClicked = output<void>();

  likeClicked = output<void>();
  handleEvent() {
    this.buttonClicked.emit();
  }

}
