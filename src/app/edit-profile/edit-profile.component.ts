import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { AuthData } from '../auth-data-model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  public user: AuthData;
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params.id;

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.authService.getUser(id).subscribe(userData => {
        this.user = {
          id: userData._id,
          fname: userData.fname,
          lname: userData.lname,
          email: userData.email,
          password: userData.password
        };
      });
    });

  }

  onEdit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    //this.authService.createUser(form.value.fname, form.value.lname, form.value.email, form.value.password);
  }
}
