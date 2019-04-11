import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
=======
import { AuthService } from '../auth.service';

>>>>>>> 1f3cff97aae8241629750a149e3e3bf3fb274cb0

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

<<<<<<< HEAD
  constructor() { }

  ngOnInit() {
  }

=======
  private fname : string;
  private lname : string;
  private email : string;

  constructor(private authService: AuthService) {}

  ngOnInit() {
  }
>>>>>>> 1f3cff97aae8241629750a149e3e3bf3fb274cb0
}
