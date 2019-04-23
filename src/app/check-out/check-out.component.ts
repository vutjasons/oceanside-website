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
  product: Item;
  userId: string;
  private token: string;
  private userInfo: string[];
  constructor(private orderService: OrderService, private itemService: ItemsService) { }

  ngOnInit() {
    this.total = 0;
    let cart = JSON.parse(sessionStorage.getItem('cart'));

    if(sessionStorage.getItem('userInfo') === null) {
      this.userId = "Guest";
    }

    else {
      this.token = sessionStorage.getItem('userInfo');
      this.userInfo = JSON.stringify(this.token).split(",");
      this.userId = this.userInfo[0].split(":")[1].split("\"")[1].split("\\")[0];
    }


    if (cart != null) {
      for (var i = 0; i < cart.length; i++) {
        let item = JSON.parse(cart[i]);
        this.items.push({
          id: item.id,
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
    userId: this.userId,
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

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.items.length; i++) {
      var stock = this.items[i].itemStock - 1;
      // tslint:disable-next-line:max-line-length
      this.itemService.updateItem(this.items[i].id, this.items[i].itemName, this.items[i].itemSize, this.items[i].itemGender, this.items[i].itemType, this.items[i].itemPrice, stock);
  }

    this.orderService.storeOrder(order);
    sessionStorage.removeItem('cart');
}

}
