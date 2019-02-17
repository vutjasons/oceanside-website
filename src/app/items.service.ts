import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  addItem(item_name, item_price, item_stock) {
    const obj = {
      item_name: item_name,
      item_price: item_price,
      item_stock: item_stock
    };
    console.log(obj);
    this.http.post(`${this.uri}/add`, obj)
      .subscribe(res => console.log('Done'));
  }

  getItems() {
    return this
            .http
            .get(`${this.uri}`);
  }
}
