import {Component, effect, inject, OnInit} from '@angular/core';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {fontAwesomeIcons} from '../shared/font-awesome-icons';
import {UserService} from '../services/user.service';
import {Router, RouterLink} from '@angular/router';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [FontAwesomeModule, RouterLink, JsonPipe],
  template: `
    <header class="p-2 bg-white shadow">
      <div class="flex items-center justify-between">
        <div class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <span class="font-medium text-gray-800 dark:text-gray-300">MT</span>
        </div>

        <div>
          <p>INSTA</p>
        </div>

        @if (userService.user() != null ) {
          <div class="flex items-center justify-center gap-2">
            <button
              (click)="logout()"
              class="bg-red-500 text-white px-3 py-1 rounded">
              Déconnexion
            </button>
          </div>
        } @else {

          <a routerLink="/connexion" class="flex items-center justify-center">
            <p>Connexion</p>
          </a>
          <a routerLink="/inscription" class="flex items-center justify-center">
            <p>Inscription</p>
          </a>
        }
      </div>

      <pre>{{ userService.user() | json }}</pre>

    </header>
  `,
  styles: ``
})
export class Header implements OnInit{
  private faIconeLibrary = inject(FaIconLibrary);
  protected readonly userService = inject(UserService);


  ngOnInit(): void {
    this.initFontAwesome();


  }

  initFontAwesome() {
    this.faIconeLibrary.addIcons(...fontAwesomeIcons);
  }

  logout() {
    this.userService.logout();
  }
}
