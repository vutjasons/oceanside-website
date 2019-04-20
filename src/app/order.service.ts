import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data-model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, private router: Router) { }


  storeOrder(order) {
    this.http
      .post('http://localhost:4000/api/order', order)
      .subscribe(response => {
        console.log(response);
      });
  }
}

