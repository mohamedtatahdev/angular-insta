import {Component, computed, effect, inject, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {PostService} from './services/post.service';
import {Header} from './components/header';
import {Footer} from './components/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  template: `
    <app-header></app-header>
    <main class="flex-1 overflow-y-auto pb-16 mb-2">
      <router-outlet></router-outlet>
    </main>

    <app-footer></app-footer>

  `,
  styles: `
  `
})
export class App {
  protected readonly title = signal('mini-insta-front');


}
