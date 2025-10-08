import {inject, Injectable, signal} from '@angular/core';
import {Observable, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {RegisterRequest, User} from '../interfaces/user.interface';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly user = signal<User | null>(null);


  private readonly http = inject(HttpClient);
private readonly router = inject(Router);
  BASE_URL = 'http://localhost:8080/api'

  constructor() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user.set(JSON.parse(storedUser));
    }
  }
  register(data: RegisterRequest): Observable<User> {
    return this.http.post<User>(`${this.BASE_URL}/user`, data);
  }

  login(credentials: { email: string, password: string }) {
    const basicToken = btoa(`${credentials.email}:${credentials.password}`);

    return new Observable<User>((observer) => {
      fetch(`${this.BASE_URL}/account`, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${basicToken}`,
        },
        credentials: 'include'
      })
        .then(async (res) => {
          if (!res.ok) throw new Error('Identifiants invalides');
          const user = await res.json();
          localStorage.setItem('user', JSON.stringify(user));
          this.user.set(user);
          observer.next(user);
          observer.complete();
        })
        .catch((err) => observer.error(err));
    });
  }




  logout() {
    this.http.post('http://localhost:8080/api/logout', {}, { withCredentials: true }).subscribe({
      next: () => {
        this.user.set(null);
        localStorage.removeItem('user');


        this.router.navigate(['/connexion']);
      },
      error: (err) => {
        console.error('Erreur lors de la déconnexion ', err);
      }
    });
  }



}
