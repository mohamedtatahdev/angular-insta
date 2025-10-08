import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { PostRequest} from '../../interfaces/post.interface';
import {PostService} from '../../services/post.service';

@Component({
  selector: 'app-post-form',
  imports: [ReactiveFormsModule],
  template: `
    <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div class="relative py-3 sm:max-w-xl sm:mx-auto">
        <div
          class="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
        </div>
        <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">

          <div class="max-w-md mx-auto">
            <div>
              <h1 class="text-2xl font-semibold">Inscription</h1>
            </div>
            <form [formGroup]="postForm" (submit)="submit()" class="divide-y divide-gray-200">
              <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div class="relative">
                <label for="image">Image</label>
                <input
                  id="image"
                  type="file"
                  (change)="onFileSelected($event)"
                  accept="image/*"
                />
                </div>
                <div class="relative">
                  <input autocomplete="off" id="title" formControlName="title" type="text" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="title" />
                  <label for="title" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Titre</label>
                </div>
                <div class="relative">
                  <input autocomplete="off" id="description" formControlName="description" type="text" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="description" />
                  <label for="description" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Description</label>
                </div>
                <div class="relative">
                  <button  class="bg-cyan-500 text-white rounded-md px-2 py-1">Submit</button>
                </div>
              </div>
            </form>
          </div>


        </div>
      </div>
    </div>
  `,
  styles: ``
})
export class PostForm {
  private postService = inject(PostService);
  private fb = inject(FormBuilder).nonNullable;

  selectedFile: File | null = null;

  postForm = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.selectedFile = target.files[0];
    }
  }

  submit() {
    if (!this.selectedFile) {
      console.error("Aucune image sélectionnée ");
      return;
    }

    if (this.postForm.valid) {
      // Étape 1 : uploader l'image
      this.postService.uploadImage(this.selectedFile).subscribe({
        next: (res) => {
          console.log('Image uploadée ', res.filename);

          const data: PostRequest = {
            image: res.filename,
            title: this.postForm.value.title!,
            description: this.postForm.value.description!,
          };

          this.postService.addPost(data).subscribe({
            next: () => console.log('Post créé avec succès '),
            error: (err) => console.error('Erreur création post ', err),
          });
        },
        error: (err) => console.error('Erreur upload image ', err),
      });
    } else {
      this.postForm.markAllAsTouched();
    }
  }

}
