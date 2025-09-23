import {Component, inject} from '@angular/core';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {fontAwesomeIcons} from '../shared/font-awesome-icons';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [
    FontAwesomeModule,
    RouterLink
  ],
  template: `
    <div class="  fixed bottom-0 left-0 z-50 h-16 w-full  shadow bg-white ">
      <div class="relative ">
        <a routerLink="/creation-post" class="inline-flex flex-col items-center justify-center p-3 absolute top-[-80px] right-4 bg-blue-500 rounded-full">
          <fa-icon  class=" text-2xl text-white" icon="file-pen"></fa-icon>
        </a>
      </div>
      <div class="shadow mx-auto grid h-full grid-cols-5 font-medium">
        <a routerLink="/"

          class=" group inline-flex flex-col items-center justify-center px-5"
        >
          <fa-icon  class="mb-2 text-2xl text-gray-500" icon="house"></fa-icon>

        </a>
        <button
          type="button"
          class="group inline-flex flex-col items-center justify-center px-5 "
        >
          <fa-icon  class="mb-2 text-2xl text-gray-500" icon="magnifying-glass"></fa-icon>

        </button>
        <button
          type="button"
          class="group inline-flex flex-col items-center justify-center  px-5 "
        >
          <fa-icon  class="mb-2 text-2xl text-gray-500" icon="map"></fa-icon>
        </button>
        <button
          type="button"
          class="inline-flex group flex-col items-center justify-center px-5 "
        >
          <fa-icon  class="mb-2 text-2xl text-gray-500" icon="message"></fa-icon>
        </button>
        <button
          type="button"
          class="group inline-flex flex-col items-center justify-center  px-5 "
        >
          <fa-icon  class="mb-2 text-2xl text-gray-500" icon="bell"></fa-icon>
        </button>
      </div>
    </div>
  `,

  styles: ``
})
export class Footer {

  private faIconeLibrary = inject(FaIconLibrary);

  ngOnInit(): void {
    this.initFontAwesome();
  }

  initFontAwesome() {
    this.faIconeLibrary.addIcons(...fontAwesomeIcons);
  }
}
