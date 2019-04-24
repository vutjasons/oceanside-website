import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Item } from '../items/item.model';
import { ItemCatalogComponent } from '../item-catalog/item-catalog.component';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { ItemsService } from '../items/items.service';
import { OrderService } from '../order.service';
import { environment } from 'src/environments/environment.prod';
import { HttpHandler } from '@angular/common/http';
import { ExpressionStatement } from '@angular/compiler';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  handler: any;
  items: Item[] = [];
  total: number = 0;
  product : Item;
  userId : string;
  validInfo : boolean = false;
  private userInfo : string[];

  constructor(private orderService: OrderService, private itemService: ItemsService, private router: Router, public zone: NgZone) { 
  }

  ngOnInit() {
    this.total = 0;
    let cart = JSON.parse(sessionStorage.getItem('cart'));

    if (sessionStorage.getItem('userID') == null) {
      this.userId = 'Guest';
    } else {
      this.userId = sessionStorage.getItem('userID');
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
    if (form.invalid || (<HTMLInputElement> document.getElementById("state")).value == "0") {
      window.alert("Invalid Information");
      return;
    }

    let info = {
      fname: form.value.fname,
      lname: form.value.lname,
      address: form.value.address,
      city: form.value.city,
      state: (<HTMLInputElement> document.getElementById("state")).value,
      zipCode: form.value.zipcode,
      cardnumber: form.value.cardnumber,
      expiration: form.value.expiration,
      cvc: form.value.cvc,
  };

    (<any>window).Stripe.card.createToken({
      number: info.cardnumber,
      exp_month: info.expiration.split("/")[0],
      exp_year: info.expiration.split("/")[1],
      cvc: info.cvc
    }, (status: number, response: any) => {
      if (status === 200) {
        let token = response.id;

        let order = {
          userId:  this.userId,
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

        for (let i = 0; i < this.items.length; i++) {
          var stock = this.items[i].itemStock - 1;
          console.log(this.items[i].id);
          this.itemService.updateItem(this.items[i].id, this.items[i].itemName, this.items[i].itemSize, this.items[i].itemGender, this.items[i].itemType, this.items[i].itemPrice, stock);
        }

        this.orderService.storeOrder(order);

        let chargeInfo = {
          stripeToken : token,
          total : this.total
        };

        this.orderService.charge(chargeInfo);

        sessionStorage.removeItem('cart');
        this.zone.run(() => {this.router.navigate(['/order-complete']); });
        
      } else {
        window.alert(response.error.message);
      }
    })

  }
}