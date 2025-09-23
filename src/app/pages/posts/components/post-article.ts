import {Component, input} from '@angular/core';
import {PostInterface} from '../../../interfaces/post.interface';

@Component({
  selector: 'app-post-article',
  imports: [],
  template: `
    <div class="max-w-sm rounded ">
      <img class="w-full"
           src="{{post().imageLink}}"
           alt="Sunset in the mountains">
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{{ post().title }}</div>

        <p class="text-gray-700 text-base">
          {{post().description}}
        </p>
      </div>

    </div>
  `,
  styles: ``
})
export class PostArticle {
  post = input.required<PostInterface>()

}
