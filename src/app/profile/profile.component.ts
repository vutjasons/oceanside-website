import { Component, OnInit, OnChanges } from '@angular/core';
import { AuthService } from '../auth.service';
import { getDefaultService } from 'selenium-webdriver/edge';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { identifierModuleUrl } from '@angular/compiler';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private userInfo : string[];
  private fname : string;
  private lname : string;
  private email : string;

  constructor(private authService: AuthService) {
    this.authService.getUserInfo(sessionStorage.getItem('userID'));
  }

  ngOnInit() {
    this.userInfo = sessionStorage.getItem('userInfo').split(",");
    this.email = this.userInfo[3].split(":")[1].split("\"")[1].split("\\")[0];
    this.lname = this.userInfo[2].split(":")[1].split("\"")[1].split("\\")[0];
    this.fname = this.userInfo[1].split(":")[1].split("\"")[1].split("\\")[0];
  }
}