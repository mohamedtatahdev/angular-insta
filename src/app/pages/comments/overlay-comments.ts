import {Component, computed, effect, inject, input, output} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommentService} from '../../services/comment.service';
import {CommentInterface, CreateCommentDto} from '../../interfaces/comment.interface';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-overlay-comments',
  imports: [ReactiveFormsModule],
  template: `
    <div class="fixed inset-0 bg-white z-50 flex flex-col
    transition-all duration-300 z-100"  [class.translate-y-0]="showComments()" [class.translate-y-full]="!showComments()">

      <div class="p-4 border-b flex items-center">
        <button class="text-xl mr-3" (click)="close.emit()">←</button>
        <h2 class="text-lg font-semibold">{{ comments().length }}</h2>
      </div>


      <div class="flex-1 overflow-y-auto p-4 space-y-4">




        @for (comment of comments(); track comment.id) {
          <div class="flex items-start space-x-3">
            <img src="https://i.pravatar.cc/40" alt="avatar" class="w-10 h-10 rounded-full">
            <div class="bg-gray-100 rounded-xl px-3 py-2 max-w-[80%]">
              <p class="text-sm font-semibold">{{ comment.author?.username }}</p>
              <p class="text-sm">{{comment.content}}</p>
              <span class="text-xs text-gray-500">il y a 2h</span>
            </div>
          </div>
        }
      </div>


      <form [formGroup]="commentForm" (submit)="submit()" class="p-3 border-t flex items-center space-x-3">
        <img src="https://i.pravatar.cc/50" alt="avatar" class="w-10 h-10 rounded-full">
        <input
          formControlName="content"
          type="text"
          placeholder="Écrire un commentaire..."
          class="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300 text-sm"
        />
        <button type="submit" class="text-blue-500 font-semibold text-sm">Publier</button>
      </form>
    </div>



  `,
  styles: ``
})
export class OverlayComments {
  showComments = input<boolean>(false);
  close = output<void>()
  pictureId = input<number | null>();


  private commentService = inject(CommentService);
  private userService = inject(UserService);
  readonly fb = inject(FormBuilder).nonNullable;
  protected comments = computed(() => {
    const value = this.commentService.commentResource.value();
    return Array.isArray(value) ? value : [];
  });



  commentForm = this.fb.group({
    content:['',  Validators.required]

  })



  isFieldValid(name:string) {
    const formControl = this.commentForm.get(name);
    return formControl?.invalid && (formControl?.dirty || formControl?.touched);
  }





  submit() {
    const currentUser = this.userService.user();
    if (!currentUser) {
      console.error(' Aucun utilisateur connecté');
      return;
    }

    if (!this.pictureId()) {
      console.error(' Aucun ID de post défini');
      return;
    }

    if (this.commentForm.valid) {
      const data: CreateCommentDto = {
        content: this.commentForm.value.content!,
        picture: { id: this.pictureId()! },
        author: { id: currentUser.id! }
      };

      console.log('Payload envoyé au backend :', data);

      this.commentService.addComment(data).subscribe({
        next: (res) => {
          this.commentService.commentResource.reload();
          this.commentForm.reset();
        },
        error: (err) => console.error('Erreur API ', err)
      });
    } else {
      this.commentForm.markAllAsTouched();
    }
  }




}
