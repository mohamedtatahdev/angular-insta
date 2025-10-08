import {Component, input} from '@angular/core';
import {PostInterface} from '../../../interfaces/post.interface';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-post-article',
  imports: [RouterLink],
  template: `
    <div class="max-w-sm rounded">
      <img class="w-full"
           [src]="post().imageLink"
           [alt]="post().title">
      <div class="px-6 py-4">
        <a [routerLink]="['/post', post().id]"
           class="font-bold text-xl mb-2 hover:text-blue-600">
          {{ post().title }}
        </a>
        <p class="text-gray-700 text-base">
          {{ post().description }}
        </p>
      </div>
    </div>
  `,
  styles: ``
})
export class PostArticle {
  post = input.required<PostInterface>();
}
