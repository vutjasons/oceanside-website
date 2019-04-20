import { Component, OnInit } from '@angular/core';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Form } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  private token : string;
  private userInfo : string[];
  private fname : string;
  private lname : string;
  private email : string;
  private id : string;

  constructor(private authService : AuthService, private router: Router) {
    this.token = sessionStorage.getItem('userInfo');
    this.userInfo = JSON.stringify(this.token).split(",");
    this.email = this.userInfo[3].split(":")[1].split("\"")[1].split("\\")[0];
    this.lname = this.userInfo[2].split(":")[1].split("\"")[1].split("\\")[0];
    this.fname = this.userInfo[1].split(":")[1].split("\"")[1].split("\\")[0];
    this.id = this.userInfo[0].split(":")[1].split("\"")[1].split("\\")[0];

   }

  ngOnInit() {
  }

  onSubmit(form : Form){
    console.log(this.id);
    this.authService.editUserInfo(this.id, 
    (<HTMLInputElement> document.getElementById('fname')).value, 
    (<HTMLInputElement> document.getElementById('lname')).value, 
    (<HTMLInputElement> document.getElementById('email')).value);
    this.router.navigate(['']);
  }

}