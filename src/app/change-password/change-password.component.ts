import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  isLoading = false; 
  private token : string;
  private decoded : string[];
  id : string;

  constructor(private authService : AuthService, public router: Router) { 
    this.token = localStorage.getItem('token');
    this.decoded = JSON.stringify(this.parseJWT(this.token)).split(",");
    this.id = this.decoded[1].split(":")[1].split("\"")[1];
    // this.id += 'a';
  }

  ngOnInit() {
  }

  onSubmit(form : NgForm){
      if (form.invalid) {
        return;
      }
      // else if (!this.authService.checkPassword(this.id, form.value.newPassword, form.value.oldPassword)){
      //   window.alert("Old password is wrong");
      // }
      this.authService.checkPassword(this.id, form.value.newPassword, form.value.oldPassword);
  }


  parseJWT(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  }
}