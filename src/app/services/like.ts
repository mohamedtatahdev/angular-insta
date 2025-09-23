import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Like {

  likePostIds = signal<number[]>([])


}
