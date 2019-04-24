import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data-model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Variable } from '@angular/compiler/src/render3/r3_ast';


@Injectable({ providedIn: 'root' })
export class AuthService {
  static userInfo: string;
  private token: string;
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;
  private tokenTimer: any;

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
    const authData: AuthData = {
      fname: fname,
      lname: lname,
      email: email,
      password: password
    };
    this.http
      .post('http://localhost:4000/api/user/signup', authData)
      .subscribe(response => {
        console.log(response);
      });
  }

  login(fname: string, lname: string, email: string, password: string) {
    const authData: AuthData = {
      fname: fname,
      lname: lname,
      email: email,
      password: password
    };
    this.http
      .post<{ token: string; expiresIn: number }>(
        'http://localhost:4000/api/user/login',
        authData
      )
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(token, expirationDate);
          this.getUserID(email);
          this.router.navigate(['/']);
        }
      });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  getUserInfo(userID : string) {
    this.http.get('http://localhost:4000/api/user/retrieve/' + userID)
    .subscribe(response => {
      sessionStorage.setItem('userInfo', JSON.stringify(response));
    })
  }

  getUserID(email : string) {
    this.http.get('http://localhost:4000/api/user/forgot/' + email)
    .subscribe(response => {
      let fetchedUser = JSON.stringify(response);
      let userID = fetchedUser.split(',')[0].split(':')[1].split('\"')[1];
      sessionStorage.setItem('userID', userID);
    })
  }

  editUserInfo(userID : string, fname : string, lname : string, email : string) {
    const authData : AuthData = {
      fname : fname,
      lname : lname,
      email : email,
      password : ''
    };
    console.log(authData);
    this.http.put('http://localhost:4000/api/user/' + userID, authData)
      .subscribe(response => {
        console.log(response);
        sessionStorage.setItem('userInfo', JSON.stringify(response));
      })
  }

  checkEmail(email : string)
  {
    const authData : AuthData = {
      fname : '',
      lname : '',
      email : '',
      password : '',
    };
    this.http.get('http://localhost:4000/api/user/forgot/' + email)
    .subscribe( response => {
      // console.log(JSON.stringify(response));
      this.http.put('http://localhost:4000/api/user/newPass/' + email, authData)
      .subscribe( response => {
        console.log("Generated Pass" + JSON.stringify(response));
        window.alert("New Password: " + JSON.stringify(response));
      })
    }, error => {
      // console.log("Invalid E-mail");
      window.alert("Invalid E-mail");
    })
  }

  checkPassword(userID : string, newPassword : string, oldPassword : string){
    const authData : AuthData = {
      fname : '',
      lname : '',
      email : '',
      password : newPassword
    };
    //console.log(authData.password);
    this.http.get('http://localhost:4000/api/user/check/' + userID + '/' + oldPassword)
      .subscribe( response => {
        /*
        fetch('http://httpstat.us/401')
        .then(function() {
          console.log(response);
        }).catch(function() {
          console.log("error");
          return;
        })
        */

        this.http.put('http://localhost:4000/api/user/password/' + userID, authData)
        .subscribe( response => {
          console.log(response);
        })
      })
  }

  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private saveUserInfo(email : string) {
    sessionStorage.setItem('email', email);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  private clearUserInfo() {
    localStorage.removeItem('fname');
    localStorage.removeItem('lname');
    localStorage.removeItem('email');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    };
  }
}
