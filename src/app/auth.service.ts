import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data-model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';




@Injectable({ providedIn: 'root'})
export class AuthService {

  private token: string;
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(fname: string, lname: string, email: string, password: string) {
    const authData: AuthData = { fname: fname, lname: lname, email: email, password: password};
    this.http.post('http://localhost:4000/api/user/signup', authData)
      .subscribe(response => {
        console.log(response);
      });
  }

  login(fname: string, lname: string, email: string, password: string) {
    const authData: AuthData = { fname: fname, lname: lname, email: email, password: password };
    this.http.post<{token: string}>('http://localhost:4000/api/user/login', authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          this.router.navigate(['/']);
        }
      });
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['/']);
  }
}
