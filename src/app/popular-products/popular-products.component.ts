import { Component, OnInit } from '@angular/core';
import Items from '../Items';
import { ItemsService } from '../items.service';

@Component({
  selector: 'popular-products',
  templateUrl: './popular-products.component.html',
  styleUrls: ['./popular-products.component.css']
})
export class PopularProductsComponent implements OnInit {

  items: Items[];
  constructor(private is: ItemsService) { }

  ngOnInit() {
    this.is
    .getItems()
    .subscribe((data: Items[]) => {
      this.items = data;
    });
  }

}
