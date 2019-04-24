import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-delete-profile',
  templateUrl: './delete-profile.component.html',
  styleUrls: ['./delete-profile.component.css']
})
export class DeleteProfileComponent implements OnInit {
  userID : string;

  constructor(private authService: AuthService) { 
    this.userID = sessionStorage.getItem('userID');
  }

  deleteProfile() {
    this.authService.deleteUser(this.userID);
    this.authService.logout();
  }

  ngOnInit() {
  }

}
