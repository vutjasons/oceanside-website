import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Item } from '../items/item.model';
import { ItemCatalogComponent } from '../item-catalog/item-catalog.component';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { ItemsService } from '../items/items.service';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  items: Item[] = [];
  total: number = 0;
  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.total = 0;
    let cart = JSON.parse(sessionStorage.getItem('cart'));

    if (cart != null) {
      for (var i = 0; i < cart.length; i++) {
        let item = JSON.parse(cart[i]);
        this.items.push({
          id: item._id,
          itemName: item.itemName,
          itemGender: item.itemGender,
          itemPrice: item.itemPrice,
          itemSize: item.itemSize,
          itemStock: item.itemStock,
          itemType: item.itemType
        });
        this.total += item.itemPrice;
      }
    }
  }

  onCheckOut(form: NgForm) {
    if (form.invalid) {
      return;
    }
    let info = {
      fname: form.value.fname,
      lname: form.value.lname,
      address: form.value.address,
      city: form.value.city,
      state: form.value.state,
      zipCode: form.value.zipcode,
      cardnumber: form.value.cardnumber,
      expiration: form.value.expiration,
      cvc: form.value.cvc,
  };

    let order = {
    datePlaced: new Date().getTime(),
    userInfo: info,
    total: this.total,
    item: this.items.map(i => {
      return {
        product: {
          name: i.itemName,
          size: i.itemSize,
          price: i.itemPrice,
        },
      };
    })
  };

    this.orderService.storeOrder(order);
}

}
