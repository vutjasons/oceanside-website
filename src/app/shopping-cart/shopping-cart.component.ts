import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../items/item.model';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from '../items/items.service';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { createEmptyUrlTree } from '@angular/router/src/url_tree';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cartEmpty: boolean;
  items: Item[] = [];
  // tslint:disable-next-line:no-inferrable-types
  total: number = 0;

  constructor(private activatedRoute: ActivatedRoute, private itemService: ItemsService, public router: Router) {
  }

 cartCheck(): void {
    let cart = JSON.parse(sessionStorage.getItem('cart'));
    if(cart.length == 0){
      window.alert("Cart is empty");
//       (<HTMLInputElement> document.getElementById('cOut')).disabled = true;
    } else {
      this.router.navigate(['/check-out']);
    }
  }


  ngOnInit() {
    this.activatedRoute.params.subscribe((params => {
      // tslint:disable-next-line:no-string-literal
      // tslint:disable-next-line:no-var-keyword
      var id2 = params['id'];
      if (id2) {
        this.itemService.getItem(id2).subscribe(itemData => {
          var item: Item = {
            id: itemData._id,
            itemName: itemData.itemName,
            itemGender: itemData.itemGender,
            itemPrice: itemData.itemPrice,
            itemSize: itemData.itemSize,
            itemStock: itemData.itemStock,
            itemType: itemData.itemType,
            itemImg: itemData.itemImg,
          };
          if (sessionStorage.getItem('cart') == null) {
            let cart: any = [];
            cart.push(JSON.stringify(item));
            sessionStorage.setItem('cart', JSON.stringify(cart));
          } else {
            let cart: any = JSON.parse(sessionStorage.getItem('cart'));
            let index: number = -1;
            for (var i = 0; i < cart.length; i++) {
              let item: Item = JSON.parse(cart[i]);
              if (item.id == id2) {
                index = i;
                break;
              }
            }
            if (index == -1) {
              cart.push(JSON.stringify(item));
              sessionStorage.setItem('cart', JSON.stringify(cart));
            } else {
              let item: Item = JSON.parse(cart[index]);
              cart[index] = JSON.stringify(item);
              sessionStorage.setItem('cart', JSON.stringify(cart));
            }
          }
          this.loadCart();
        });
      } else {
        this.loadCart();
      }
    }));
    //  let cart = JSON.parse(sessionStorage.getItem('cart'));
    //  if(cart.length != null) {
    //    if (cart.length == 0) {
    //      (<HTMLInputElement>document.getElementById('cOut')).disabled = true;
    //    }
    //  }
  }

  loadCart(): void {
    this.total = 0;
    this.items = [];
    let cart = JSON.parse(sessionStorage.getItem('cart'));

    if (cart != null)
    {
      for (var i = 0; i < cart.length; i++) {
        let item = JSON.parse(cart[i]);
        this.items.push({
          id: item.id,
          itemName: item.itemName,
          itemGender: item.itemGender,
          itemPrice: item.itemPrice,
          itemSize: item.itemSize,
          itemStock: item.itemStock,
          itemType: item.itemType,
          itemImg: item.itemImg,
        });
        this.total += item.itemPrice;
      }
    }
  }

  remove(id: string): void {
    let cart: any = JSON.parse(sessionStorage.getItem('cart'));
    let index: number = -1;
    for (var i = 0; i < cart.length; i++) {
      let item: Item = JSON.parse(cart[i]);
      console.log(item.id);
      console.log(id);
      if (item.id == id) {
        cart.splice(i, 1);
        break;
      }
    }
    sessionStorage.setItem('cart', JSON.stringify(cart));
    this.loadCart();
  }

}