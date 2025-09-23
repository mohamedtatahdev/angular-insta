import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {RegisterRequest} from '../../interfaces/user.interface';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule
  ],
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
            <form [formGroup]="registerForm" (submit)="submit()" class="divide-y divide-gray-200">
              <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div class="relative">
                  <input autocomplete="off" id="email" formControlName="email" type="text" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email " />
                  <label for="email" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email </label>
                </div>
                <div class="relative">
                  <input autocomplete="off" id="displayName" formControlName="displayName" type="text" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Pseudo" />
                  <label for="displayName" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Pseudo</label>
                </div>
                <div class="relative">
                  <input autocomplete="off" id="password" formControlName="password" type="password" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Mot de passe" />
                  <label for="password" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Mot de passe</label>
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
export class RegisterComponent  {

  private userService = inject(UserService);
  readonly fb = inject(FormBuilder).nonNullable;

  registerForm = this.fb.group({
    email: ['', [Validators.required]],
    displayName: ['', [Validators.required]],
    password: ['', [Validators.required]],
  })

  isFieldValid(name:string) {
    const formControl = this.registerForm.get(name);
    return formControl?.invalid && (formControl?.dirty || formControl?.touched);
  }


  submit() {
    if (this.registerForm.valid) {
      const playload: RegisterRequest = this.registerForm.getRawValue();
      this.userService.register(playload).subscribe({
        next: (user) => {
          console.log('Inscription réussie ✅', user);
        },
        error: (err) => {
          console.error('Erreur inscription ❌', err);
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

}
