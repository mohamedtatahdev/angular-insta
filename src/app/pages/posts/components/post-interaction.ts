import {Component, inject, input, OnInit, output} from '@angular/core';
import {fontAwesomeIcons} from '../../../shared/font-awesome-icons';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {PostInterface} from '../../../interfaces/post.interface';
import {UserService} from '../../../services/user.service';
import {Like} from '../../../services/like';

@Component({
  selector: 'app-post-interaction',
  imports: [FontAwesomeModule],
  template: `
    <div class="mt-2 p-4 flex justify-between items-center">
      <div class="flex items-center justify-center " (click)="toggleLike()">
        <fa-icon class="text-sm " [class.text-blue-500]="isLikedByMe()"
                 [class.text-gray-500]="!isLikedByMe()" icon="thumbs-up"></fa-icon>
        <span class="text-sm text-gray-500" > J'aime</span>
        <span>{{ post().likes.length }}</span>
      </div>

      <div class="flex items-center justify-center">
        <fa-icon class="text-sm"   icon="comment"></fa-icon>

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
   userService = inject(UserService);
  buttonClick = output<void>();
   likeClick=output<void>();
likeService = inject(Like)

  notifyParent() {
    this.buttonClick.emit();
  }

  ngOnInit(): void {
    this.initFontAwesome();
  }

  initFontAwesome() {
    this.faIconeLibrary.addIcons(...fontAwesomeIcons);
  }
  post = input.required<PostInterface>()

  isLikedByMe(): boolean {
    const currentUserId = this.userService.user()?.id;
    if (!currentUserId || !this.post()?.likes) return false;

    return this.post().likes.some(likeUser => likeUser.id === currentUserId);
  }


  toggleLike() {
    const post = this.post();
    if (!post) return;

    this.likeService.likePost(post.id).subscribe({
      next: () => {
        // 🔄 Mets à jour localement le tableau des likes pour feedback instantané
        const currentUser = this.userService.user();
        if (!currentUser) return;

        const alreadyLiked = post.likes.some(u => u.id === currentUser.id);

        if (alreadyLiked) {
          post.likes = post.likes.filter(u => u.id !== currentUser.id);
        } else {
          post.likes = [...post.likes, currentUser];
        }
      },
      error: err => {
        console.error('Erreur lors du like :', err);
      }
    });
  }


}
