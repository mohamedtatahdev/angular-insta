import {Component, inject, OnInit, output} from '@angular/core';
import {fontAwesomeIcons} from '../../../shared/font-awesome-icons';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-post-interaction',
  imports: [FontAwesomeModule],
  template: `
    <div class="mt-2 p-4 flex justify-between items-center">
      <div class="flex items-center justify-center ">
        <fa-icon class="text-sm text-gray-500" icon="thumbs-up"></fa-icon>
        <span class="text-sm text-gray-500">J'aime</span>
      </div>

      <div class="flex items-center justify-center">
        <fa-icon class="text-sm text-gray-500" icon="comment"></fa-icon>

        <span class="text-xs text-gray-500"
              (click)="notifyParent()"
        >Commenter</span>
      </div>
      <div class="flex items-center justify-center">
        <fa-icon class="text-sm text-gray-500" icon="bookmark"></fa-icon>

        <span class="text-xs text-gray-500">Favoris</span>
      </div>
    </div>
  `,
  styles: ``
})
export class PostInteraction implements OnInit {
  private faIconeLibrary = inject(FaIconLibrary);
  buttonClick = output<void>();


  notifyParent() {
    this.buttonClick.emit();
  }

  ngOnInit(): void {
    this.initFontAwesome();
  }

  initFontAwesome() {
    this.faIconeLibrary.addIcons(...fontAwesomeIcons);
  }

}
