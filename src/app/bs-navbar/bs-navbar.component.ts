import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { AuthData } from '../auth-data-model';
import { Router } from '@angular/router';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit, OnDestroy {

  userIsAuthenticated = false;
  user: AuthData;

  private authListenerSubs: Subscription;
  private userListenerSubs: Subscription;

  constructor(private authService: AuthService, public router: Router) {}


  ngOnInit() {
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });

    this.userListenerSubs = this.authService.getAuthUserListener().subscribe((user: AuthData) => {
      this.user = user;
    });

    console.log(this.user);
  }

  onUser(userEmail: string) {
    this.router.navigate(['profile/edit', userEmail]);
  }

  onLogout() {
    this.authService.logout();

  }
  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}
