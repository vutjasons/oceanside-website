import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private fname : string;
  private lname : string;
  private email : string;

  constructor(private authService: AuthService) {}

  ngOnInit() {
  }

}
