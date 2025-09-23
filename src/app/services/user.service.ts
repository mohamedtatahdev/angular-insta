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
    console.log('🟢 Nouvelle instance de UserService créée');
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

    return this.http.get<User>(`${this.BASE_URL}/account`, {
      headers: { 'Authorization': `Basic ${basicToken}` },
      withCredentials: true
    }).pipe(
      tap(response => {
        localStorage.setItem('user', JSON.stringify(response));
        this.user.set(response);
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });

      })
    );
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
