import { Routes } from '@angular/router';
import {PostsComponent} from './pages/posts/posts.component';
import {RegisterComponent} from './pages/users/register.component';
import {LoginComponent} from './pages/users/login.component';
import {PostForm} from './pages/posts/post-form';

export const routes: Routes = [
  {
    path: 'inscription',
    component: RegisterComponent
  },
  { path: 'connexion',
    component: LoginComponent
  },
  {
    path: 'creation-post',
    component: PostForm
  },
  { path: '',
    component: PostsComponent },


];
