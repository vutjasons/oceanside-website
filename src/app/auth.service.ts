import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data-model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';




@Injectable({ providedIn: 'root'})
export class AuthService {

  private user: AuthData;
  private token: string;
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;
  private authUserListener = new Subject<AuthData>();


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

  getAuthUserListener() {
    return this.authUserListener.asObservable();
  }

  createUser(id: string, fname: string, lname: string, email: string, password: string) {
    const authData: AuthData = {id: id, fname: fname, lname: lname, email: email, password: password};
    this.http.post('http://localhost:4000/api/user/signup', authData)
      .subscribe(response => {
        console.log(response);
      });
  }

  login(id: string, fname: string, lname: string, email: string, password: string) {
    const authData: AuthData = { id: null, fname: fname, lname: lname, email: email, password: password };
    this.http.post<{token: string, userId: string}>('http://localhost:4000/api/user/login', authData)
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

  // Returns the clone of the specified item
  getUser(id: string) {
    return this.http.get<{
      _id: string;
      fname: string;
      lname: string;
      email: string;
      password: string;
    }>('http://localhost:4000/api/user/' + id);
  }
}
