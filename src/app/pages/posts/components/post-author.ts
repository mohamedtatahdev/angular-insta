import {Component, inject, input, OnInit} from '@angular/core';
import {Author, PostInterface} from '../../../interfaces/post.interface';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {fontAwesomeIcons} from '../../../shared/font-awesome-icons';
import {TimeAgoPipe} from '../../../shared/pipes/time-ago-pipe';

@Component({
  selector: 'app-post-author',
  imports: [
    FontAwesomeModule,

    TimeAgoPipe

  ],
  template: `
    <header class="flex flex-row items-center justify-between p-2 mb-2">
      <div class="flex flex-row items-center justify-center gap-1">


        <div class="flex flex-col">
          <p class="text-lg">{{ author().username}}</p>
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


  ngOnInit(): void {
    this.initFontAwesome();
  }

  initFontAwesome() {
    this.faIconeLibrary.addIcons(...fontAwesomeIcons);
  }

}
